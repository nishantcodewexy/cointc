const assert = require("assert");
const searchBuilder = require("sequelize-search-builder");
const Sequelize = require("sequelize");
const Joi = require("joi");
const { roles } = require("../consts");
const faker = require("faker");

/**
 * @description - User controller
 * @param {Object} server  - Server instance
 * @returns
 */
function UserController(server) {
  /*********************** HELPERS ***************************/
  const { __upsert, __update, __destroy, __assertRole } = require("./_methods")(
    server
  );

  const {
    db: { User, sequelize, Wallet, BasicProfile, AdminProfile, Upload },
    boom,
    config: { client_url },
    helpers: { decrypt, mailer, jwt, generator, paginator, filters },
    consts: {
      roles: _roles,
      types: { ProfileModeType, country },
    },
  } = server.app;

  return {
    // CREATE------------------------------------------------------------
    /**
     * @function create
     * @description - Creates new user (**Authenticated users only**)
     * @param {Object} req - Request object
     * @param {Object} req.pre - Request Prehandler object
     * @returns
     */
    async createMe(req) {
      let {
        payload: { email, password, referrer, ...restOfPayload },
      } = req;
      assert(email, boom.badRequest("Expected email"));
      // return {status: 'done'};
      try {
        // Check that the user email doesn't already exist
        let _user = await User.findOne({
          where: {
            email,
          },
        });

        if (_user)
          throw boom.notAcceptable(
            `User with the email: ${email} already exist`
          );

        return await sequelize.transaction(async (t) => {
          let profile = "BasicProfile";
          let role = "basic";

          let newUser = {
            data: {
              email,
              password,
              role,
              [profile]: {
                email,
                ...restOfPayload,
              },
            },
            options: {
              transaction: t,
              include: profile,
            },
          };

          _user = await User.create(newUser.data, newUser.options);

          /******** TODO: Send mail to user ***************/

          /************ End send mail ***************/

          await _user.createWallet({ asset: "BTC" }, { transaction: t });

          if (referrer) {
            const ref = await User.findByPk(referrer);
            ref && ref.addReferrer(_user);
          }

          const { BasicProfile, ...rest } = _user.toPublic();
          return sudo
            ? {
                created: true,
              }
            : {
                token: jwt.create(_user),
                user: { ...rest, ...BasicProfile },
              };
        });
      } catch (error) {
        console.error(error);
        return boom.boomify(error);
      }
    },

    /**
     * @function bulkCreate - Creates currency (**Admin only**)
     * @param {Object} req - Request object
     * @param {Object} req.payload
     * @param {Object[]} req.payload.data
     * @returns
     */
    async bulkCreate(req) {
      const { payload = [] } = req;

      const payloadSchema = Joi.array().items(
        Joi.object({
          email: Joi.string()
            .email()
            .required(),
          role: Joi.string()
            .valid(...Object.keys(_roles))
            .required(),
          profile: Joi.object().optional(),
        }) /* .unknown(true) */
      );

      const adminProfileSchema = Joi.object({
        mode: Joi.string().valid(...Object.keys(ProfileModeType)),
        nickname: Joi.string().optional(),
      });

      const basicProfileSchema = Joi.object({
        mode: Joi.string().valid(...Object.keys(ProfileModeType)),
        nickname: Joi.string().optional(),
        country: Joi.string()
          .valid(...Object.keys(country))
          .optional(),
        last_name: Joi.string().optional(),
        other_names: Joi.string().optional(),
      });

      const { value, error } = payloadSchema.validate(payload);
      if (error) throw boom.badData("invalid data for User", error.message);

      try {
        return await sequelize.transaction(async (t) => {
          return await Promise.all(
            value.map(async (user) => {
              let password = generator.secret();
              let savedProfile = null;
              // if (data.role == roles.admin) {
              if (user?.isAdmin) {
                let { error, value } = adminProfileSchema.validate(
                  user?.profile || {}
                );
                if (error)
                  throw boom.badData(
                    "invalid data for UserProfile::Admin",
                    error.message
                  );

                let profileData = value || {};
                delete user?.profile;

                let newUser = await User.create(
                  {
                    ...user,
                    password,
                    AdminProfile: profileData,
                    include: AdminProfile,
                  },
                  {
                    transaction: t,
                  }
                );
                let { AdminProfile: profile, ...rest } = newUser.toPublic();
                savedProfile = { ...profile, ...rest };
              } else {
                let { error, value } = basicProfileSchema.validate(
                  user.profile
                );
                if (error)
                  throw boom.badData(
                    "invalid data for UserProfile::Basic",
                    error.message
                  );
                // if (error) return { error };

                delete user?.profile;

                let newUser = await User.create(
                  {
                    ...user,
                    password,
                    BasicProfile: { email: user?.email, ...value },
                  },
                  {
                    transaction: t,
                    include: BasicProfile,
                  }
                );
                let { BasicProfile: profile, ...rest } = newUser.toPublic();

                savedProfile = { ...profile, ...rest };
              }
              return savedProfile;
            })
          );
        });
      } catch (error) {
        console.error(error);
        return boom.boomify(error);
      }
    },

    // UPDATE------------------------------------------------------------
    /**
     * @function updateMe - Update personal profile
     * @param {Object} req
     * @returns
     */
    async updateMe(req) {
      try {
        let {
          pre: { user },
          payload,
        } = req;
        //determine the allowed attributes to modify per user role

        //  Generally allowed attrinutes
        let attributes = [
          "last_name",
          "other_names",
          "nickname",
          "kyc",
          "mode",
          "country",
          "kyc_document",
        ];
        // Admin only allowed attributes
        attributes = user?.isAdmin && [
          "suitability",
          "kyc_status",
          "kyc_document",
          "permission",
          ...attributes,
        ];

        let options = {
          returning: true,
          attributes,
          where: {
            id: user?.id,
          },
        };
        let model = user?.__proto__.constructor.name;
        return await __update(model, payload, options);
      } catch (error) {
        console.error(error);
      }
    },

    /**
     * @function update - updates single user record - (**only Admin**)
     * @param {Object} req
     * @param {Object} req.payload
     * @param {Object} req.payload.data  - upsert record
     * @returns
     */
    async update(req) {
      try {
        let {
          pre: { user },
          payload = {},
          params: { id },
        } = req;

        allowedUserAttrbs = ["permission"];
        let userUpdates = {},
          profileUpdates = {};

        Object.keys(payload).forEach((key) => {
          if (allowedUserAttrbs.includes(key)) {
            userUpdates[key] = allowedUserAttrbs[key];
          } else {
            profileUpdates[key] = allowedUserAttrbs[key];
          }
        });

        // user is an admin
        // let { email, role, permission, ...profileData } = payload;
        let target_user = await User.findOne({ where: { id } });
        //determine the targe user's allowed attributes
        let attributes = target_user?.isBasic
          ? [
              "mode",
              "nickname",
              "kyc",
              "suitability",
              "country",
              "kyc_status",
              "last_name",
              "other_names",
              "kyc_document",
            ]
          : ["nickname", "kyc"];

        let target_profile = target_user?.profile;

        if (target_profile) {
          let options = {
            attributes,
            where: {
              profile_id: target_profile?.profile_id,
            },
            returning: true,
            logging: console.log,
          };
          let model = target_profile?.__proto__.constructor.name;
          return await sequelize.transaction((t) => {
            return Promise.all([
              __update("User", userUpdates, { where: { id }, logging: true }),
              __update(model, profileUpdates, options),
            ]);
          });
        }
        return boom.notFound("User profile does not exist");
      } catch (error) {
        console.error(error);
        return boom.boomify(error);
      }
    },

    /**
     * @function update - updates user records
     * @param {Object} req
     * @param {Object} req.payload
     * @param {Array} req.payload.data  - array of upsert records
     * @returns
     */
    async bulkUpdate(req) {
      try {
        const {
          payload: { data, suspend = false },
        } = req;
        // TODO: authorization
        const attributes = ["mode", "role"];

        return await sequelize.transaction(async (t) => {
          return data.map(async ({ id, ...payload }) => {
            if (suspend) {
              payload = {
                ...payload,
                archived_at: new Date().toLocaleString(),
              };
            }
            // Find user
            const __user = await User.update({ where: { id } });
            // get user role to determine which profile to update
            const { model } = __assertRole(__user?.role);
            let where = {
              user_id: id,
            };
            // if (suspend) {
            //   // Soft delete user
            //   // payload.archived_at = new Date().toLocaleString();
            //   let destroyed = await __destroy(User?.name, { id }, true, {
            //     transaction: t,
            //   });
            //   console.log({ destroyed });
            // }

            console.log({ payload });
            return await __update(model, payload, where, {
              transaction: t,
              attributes,
            });
          });
        });
      } catch (error) {
        console.error(error);
        return boom.boomify(error);
      }
    },

    // DELETE------------------------------------------------------------
    /**
     * @function remove - remove mulitple User records
     * @param {Object} req  - request object
     * @param {Object} req.payload  - request body
     * @param {Array} req.payload.data  - array of ids
     * @returns
     */
    async bulkRemove(req, h) {
      const {
        payload: { data, force = false },
      } = req;

      if (!data?.id) throw boom.badRequest("No ID provided");
      return {
        deleted: Boolean(
          await sequelize.transaction(async (t) => {
            data.forEach(async (id) => {
              let where = { id };
              await __destroy("User", where, force, { transaction: t });
            });
          })
        ),
      };
    },

    /**
     * @function remove - Remove single User
     * @param {Object} req
     * @returns
     */
    async remove(req) {
      let {
        payload: { force = false },
        params: { id },
      } = req;

      let where = { id };
      return { deleted: Boolean(await __destroy("User", where, force)) };
    },

    // LIST------------------------------------------------------------
    /**
     * @function bulkList - Fetched multiple User
     * @param {Object} req
     * @returns
     */
    async bulkRetrieve(req) {
      try {
        const { query } = req;
        const queryFilters = await filters({ query, searchFields: ["email"] });

        const options = {
          ...queryFilters,
          attributes: { exclude: ["password"] },
        };

        let queryset = await User.findAndCountAll(options);
        const { limit, offset } = queryFilters;

        return paginator({
          queryset,
          limit,
          offset,
        });
      } catch (error) {
        console.error(error);
        return boom.boomify(error);
      }
    },

    /**
     * @function get - gets single User
     * @param {Object} req
     * @returns
     */
    async retrieve(req) {
      const {
        query: { id },
      } = req;
      try {
        // handle invalid query <id> 400
        if (!id) return boom.badRequest();

        // Find target user
        return await User.findOne({
          where: { id },
        }).then(
          (_user) => _user?.toPublic() ?? boom.notFound("User not found!")
        );
      } catch (error) {
        console.error(error);
        return boom.boomify(error);
      }
    },

    // OTHERS------------------------------------------------------------
    /**
     * @function profile - Fetches user profile
     * @param {Object} req
     * @param {Object} req.pre
     * @param {Object} req.pre.user - User model
     * @returns
     */
    async profile(req) {
      try {
        // get user ID from preHandler
        let {
          user: { role, id },
        } = req.pre;
        // Determine user role
        const { getter } = __assertRole(role);

        // Fetch the user's profile that matches the id and role
        let account = await User.findOne({
          where: { id, role },
        });
        let accountProfile = await account[getter]();
        return {
          ...account.toPublic(),
          ...accountProfile.dataValues,
        };
      } catch (error) {
        console.error(error);
        return boom.badRequest(error);
      }
    },

    async findID(req) {
      try {
        // get user ID from preHandler
        let {
          params: { id },
          pre: { user },
        } = req;

        // handle invalid params <id> 400
        if (!id) return boom.badRequest();
        const _user = await User.findOne({
          where: {
            ...(user && id !== "me" ? { id: id } : { id: user.id }),
          },
        });
        if (!_user) throw boom.notFound();

        const result = await User.findOne({
          where: {
            ...(user && id !== "me" ? { id: id } : { id: user.id }),
          },
          attributes: [
            "id",
            "email",
            "role",
            "permission",
            "last_seen",
            "login_at",
            "updated_at",
          ],

          include:
            _user.role === roles.admin
              ? {
                  model: AdminProfile,
                  as: "admin_profile",
                  attributes: ["nickname", "kyc", "created_at", "updated_at"],
                }
              : {
                  model: BasicProfile,
                  as: "profile",
                  attributes: [
                    "mode",
                    "nickname",
                    "kyc",
                    "referral_code",
                    "created_at",
                    "updated_at",
                    "suitability",
                    "country",
                    "profile_pic",
                    "kyc_status",
                    "date_of_birth",
                    "last_name",
                    "other_names",
                  ],
                  include: {
                    model: Upload,
                  },
                },
        });

        if (!result) {
          throw boom.notFound("not found");
        }

        return result;
        // .then((_user) => _user.role)
        // .catch((error) => {
        //   throw new Error(`User Controller:findID - ${error.message}`);
        // });

        // Do not allow standard users to find admins
        // let where = role == _roles.standard ? { id, role } : { id };

        // // Find target user
        // return await User.findOne({
        //   where,
        // }).then(
        //   (_user) => _user?.toPublic() ?? boom.notFound("User not found!")
        // );
      } catch (error) {
        console.error(error);
        return boom.boomify(error);
      }
    },

    async listBalance(req, h) {
      try {
        // Find target user
        return await User.findAndCountAll({
          include: [Wallet],
        }).then(
          (_user) => _user?.toPublic() ?? boom.notFound("User not found!")
        );
      } catch (error) {
        console.error(error);
        return boom.boomify(error);
      }
    },

    /**
     * @function - Authenticates user
     * @param {Object} req - Request object
     * @param {Object} req.payload
     * @param {String} req.payload.email
     * @param {String | "basic"} req.payload.role
     * @param {String} req.payload.password
     * @returns
     */
    async authenticate(req) {
      try {
        const {
          payload: { email, role = _roles.basic, access_level = 1, password },
        } = req;
        let where = { email, access_level };
        // const { getter } = __assertRole(role);

        // fetch user record from DB that matches the email
        let account = await User.findOne({
          where,
          // include: [AdminProfile, BasicProfile],
          logger: console.log,
        });

        if (account) {
          // Check if password matches
          if (await decrypt(password, account.password)) {
            // Update the last_login
            account.login_at = new Date();
            await account.save();

            return {
              token: jwt.create(account),
              ...account.toPublic(),
            };
          } else return boom.notFound("Incorrect password!");
        }

        return boom.notFound("User account not found");
      } catch (error) {
        console.error(error);
        return boom.boomify(error);
      }
    },

    async confirmByEmail(req) {
      let { email, token } = req.query;
      assert(email, boom.badRequest("Missing credential to confirm email"));
      assert(token, boom.badRequest("Missing credential to confirm email"));

      const decoded = jwt.decodeAndVerify(token);
      // debugger;
      return decoded.isValid
        ? await User.update(
            { kyc: { email: true } },
            { where: { id: decoded.payload.user } }
          ).catch(boom.boomify)
        : boom.unauthorized(`Cannot confirm user account!: ${decoded.error}`);
    },

    async resetPassword(req) {
      let { password, token } = req.payload;
      // decrypt jwt token
      return (
        jwt.decodeAndVerify(token) &&
        user.update({ password }, { where: { id: user_id } })
      );
    },

    async requestPasswordReset(req) {
      const { email } = req.payload;

      try {
        const user = User.findOne({ where: { email } });

        // Expires in 900s -> 15mins
        const token = jwt.create(user, 900);

        // generate reset password link with token
        const reset_link = `${client_url}/reset_password/?token=${token}`;

        // Sent reset password link to email of user
        var mailOptions = {
          to: email,
          subject: "Account - Reset Password",
          htmlTemplate: {
            name: "account_reset_password",
            transform: {
              recipientName: "Armstrong Ebong",
              resetLink: reset_link,
              recipientEmail: email,
            },
          },
        };

        return await mailer.sendMail(mailOptions);
      } catch (err) {
        console.error(err);
        return boom.boomify(err);
      }
    },

    async listReferrals() {
      const filterRespond = await filters({ query, searchFields: ["email"] });
      const queryset = User.getUsers();
      const { limit, offset } = filterRespond;
      return paginator({ queryset, limit, offset }).catch(boom.boomify);
    },
  };
}

module.exports = UserController;
