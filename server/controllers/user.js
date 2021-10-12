const assert = require("assert");
const searchBuilder = require("sequelize-search-builder");
const Sequelize = require("sequelize");
const Joi = require("joi");
const { roles } = require("../consts");
/**
 * @description - User controller
 * @param {Object} server  - Server instance
 * @returns
 */
module.exports = (server) => {
  /*********************** HELPERS ***************************/
  const { __upsert, __destroy, __assertRole } = require("./_methods")(server);

  const {
    db: { User, sequelize, Wallet, BasicProfile, AdminProfile, Upload },
    boom,
    config: { client_url },
    helpers: { decrypt, mailer, jwt, generator },
    consts: {
      roles: _roles,
      types: { country },
    },
  } = server.app;

  const group = require("./group/user.group.controller")(server);

  const UserController = {
    /**
     * @function create
     * @description - Creates new user (**Authenticated users only**)
     * @param {Object} req - Request object
     * @param {Object} req.pre - Request Prehandler object
     * @returns
     */
    async create(req) {
      const { role } = req.pre;
      let {
        payload: { email, password, referrer, sudo = false, ...restOfPayload },
      } = req;

      assert(email, boom.badRequest("Expected email"));
      // return {status: 'done'};
      try {
        const { profile } = __assertRole(role);

        // Determines whether to mail password to user
        // let mail_secret = !password;

        // Generate password if one is not supplied
        if (sudo) {
          // debugger;
          password = generator.secret();
        }
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
          let newUser = {
            data: {
              email,
              password,
              role,
              profile: {
                email,
                ...restOfPayload,
              },
            },
            options: {
              transaction: t,
              include: [
                {
                  association: profile,
                },
              ],
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

          return sudo
            ? {
                created: true,
              }
            : {
                token: jwt.create(_user),
                user: _user.toPublic(),
              };
        });
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
          payload: { email, role = _roles.basic, password },
        } = req;

        // const { getter } = __assertRole(role);

        // fetch user record from DB that matches the email
        let account = await User.findOne({
          where: { email, role },
          // include: [AdminProfile, BasicProfile],
          logger: console.log,
        });

        if (account) {
          // lazy load profile attached to account
          // let account_profile = await account.getProfilable();
          // Check if password matches
          if (await decrypt(password, account.password)) {
            // Update the last_login attribute of the user model

            account.login_at = new Date(Date.now());
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

    confirmByEmail: async (req) => {
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

    resetPassword: async function(req) {
      let { password, token } = req.payload;
      // decrypt jwt token
      return (
        jwt.decodeAndVerify(token) &&
        user.update({ password }, { where: { id: user_id } })
      );
    },

    requestPasswordReset: async function(req) {
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
    /**
     * @function profile - Fetches user profile
     * @param {Object} req
     * @param {Object} req.pre
     * @param {Object} req.pre.user - User model
     * @returns
     */
    profile: async (req) => {
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
          pre: { isAdmin },
          auth: {
            credentials: { user },
          },
        } = req;

        // handle invalid params <id> 400
        if (!id) return boom.badRequest();
        const _user = await User.findOne({
          where: {
            ...(isAdmin && id !== "me" ? { id: id } : { id: user.id }),
          },
        });
        if (!_user) throw boom.notFound();

        const result = await User.findOne({
          where: {
            ...(isAdmin && id !== "me" ? { id: id } : { id: user.id }),
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

    // Permanently destroy user record
    remove: async (req) => {
      // get user ID from preHandler
      let {
        auth: {
          credentials: { user },
        },
        payload: { soft = true },
        pre: { isAdmin },
      } = req;
      let where = { id: user.id };

      if (isAdmin) {
        return group.remove(req);
      }

      return { deleted: Boolean(await __destroy("User", where, soft)) };
    },

    /**
     * @function update - updates single user record
     * @param {Object} req
     * @param {Object} req.payload
     * @param {Object} req.payload.data  - upsert record
     * @param {Object} req.payload.authorization  - authorization
     * @returns
     */
    async update(req) {
      try {
        let {
          pre: { isAdmin },
          payload,
          params: { id },
          auth: {
            credentials: { user },
          },
        } = req;

        let schema;

        if (isAdmin && id !== "me") {
          schema = Joi.object({
            kyc: Joi.object({
              email: Joi.bool(),
              payment_methods: Joi.object({
                we_chat: Joi.any(),
              }),
              sms: Joi.string(),
              id: Joi.string(),
              account_no: Joi.string(),
              bank_name: Joi.string(),
              IFSC_code: Joi.string(),
              country: Joi.string(),
              currency: Joi.string(),
            }),
            permission: Joi.boolean().optional(),
          });
        } else if (isAdmin && id === "me") {
          schema = Joi.object({
            nickname: Joi.string().optional(),
          });
        } else {
          schema = Joi.object({
            nickname: Joi.string().optional(),
            country: Joi.string()
              .valid(...Object.keys(country))
              .optional(),
            profile_pic: Joi.string()
              .uuid()
              .optional(),
            kyc_document: Joi.string()
              .uuid()
              .optional(),
          });
        }

        const { error, value } = schema.validate(payload);

        if (error) throw boom.badRequest(error);

        const permission = payload.permission;

        if (isAdmin && id === "me") {
          let profile = await AdminProfile.update(payload, {
            where: {
              user_id: user.id,
            },
          });

          if (profile && [true, false].includes(permission)) {
            await User.update(
              {
                permission,
              },
              {
                where: {
                  id: user.id,
                },
              }
            );
          }

          return profile;
        } else {
          let profile = await BasicProfile.update(payload, {
            where: {
              user_id: isAdmin && id !== "me" ? id : user.id,
            },
          });
          if (profile && [true, false].includes(permission)) {
            console.log("am here");
            let __user = await User.update(
              {
                permission,
              },
              {
                where: {
                  id: isAdmin && id !== "me" ? id : user.id,
                },
              }
            );
          }

          return profile;
        }

        // console.log("values",data)
        // return await User.update(
        //   data,
        //   {
        //     where:{
        //       ...(isAdmin&&id!=="me"?{id}:{id:user.id})
        //   },
        //   include:[
        //     {
        //       model:Profile,
        //       as:"profile"
        //     },
        //     {
        //       model:AdminProfile,
        //       as:"admin_profile",
        //     }
        //   ]
        // })

        // // TODO: authorization
        // const { model } = __assertRole(user?.role);
        // let where = {
        //   user_id: user.id,
        // };

        // const attributes = ["mode", "nickname"];
        // return { updated: __upsert(model, data, where, { attributes }) };
      } catch (error) {
        console.error(error);
        return boom.boomify(error);
      }
    },
  };

  return {
    ...UserController,
    group: require("./group/user.group.controller")(server),
  };
};
