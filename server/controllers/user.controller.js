const assert = require("assert");
const searchBuilder = require("sequelize-search-builder");
const Sequelize = require("sequelize");
const Joi = require("joi");
const { roles } = require("../consts");
const faker = require("faker");
const dfn = require("date-fns");
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
/**
 * @description - User controller
 * @param {Object} server  - Server instance
 * @returns
 */
module.exports = function UserController(server) {
  /*********************** HELPERS ***************************/
  const { __upsert, __update, __destroy, __assertRole } = require("./utils")(
    server
  );

  const {
    db: { User, sequelize, Profile },
    boom,
    config: { client_url },
    helpers: { decrypt, mailer, jwt, generator, paginator, filters },
    consts: { roles: _roles },
  } = server.app;

  async function login(account) {
    // Update the last_login
    account.login_at = new Date();
    await account.save();

    return {
      token: jwt.create(account),
      ...account.toPublic(),
    };
  }

  /**
   * @function createNew - Creates a new user record
   * @param {Object} payload
   * @returns
   */
  async function createNew({ email, password = null, ...others }) {
    try {
      let mailBody = "";
      let user = await User.findOne({
        where: {
          email,
        },
      });
      if (user)
        throw boom.notAcceptable(`User with the email: ${email} already exist`);

      if (!password) {
        password = faker.internet.password();
        //TODO Attach new password to mail
        mailBody += `<p>Generated password: <em>${newPassword}</em></p> <strong>We strongly advise that you change your password later!</strong>`;
      }

      return await sequelize.transaction(async (t) => {
        let newUser = {
          data: {
            email,
            password,
            profile: {
              email,
              ...others,
            },
          },
          options: {
            transaction: t,
            include: Profile,
          },
        };

        user = await User.create(newUser.data, newUser.options);

        // Security
        await user.createSecurity({}, { transaction: t });
        await user.createWallet({ asset: "BTC" }, { transaction: t });
        // Set referral link id any
        if (others?.invite_code) {
          const ref = await User.findOne({
            where: {
              "profile.invite_code": invite_code,
            },
          });
          ref && ref.addReferrer(user, { transaction: t });
        }

        //TODO Send mail to user

        return {
          user: user.toPublic(),
        };
      });
    } catch (err) {
      console.error(err);
      return boom.internal(err.message, err);
    }
  }

  function filterAssociations(list = []) {
    let valid = [];
    list.forEach((item) => {
      for (let assc in User.associations) {
        let isSame = assc?.toLowerCase() === item?.toLowerCase();

        if (isSame) {
          valid.push(assc);
          break;
        }
      }
    });
    return valid?.length ? valid : null;
  }

  return {
    // CREATE------------------------------------------------------------
    /**
     * @function create - Personal account creation
     * @description - Creates new user
     * @param {Object} req - Request object
     * @param {Object} req.pre - Request Prehandler object
     * @returns
     */
    async create(req) {
      let { payload } = req;

      try {
        return createNew(payload);
      } catch (error) {
        console.error(error);
        return boom.boomify(error);
      }
    },

    /**
     * @function bulkCreate - Creates multiple user records (**Admin only**)
     * @param {Object} req - Request object
     * @param {Object} req.payload
     * @param {Object[]} req.payload.data
     * @returns
     */
    async bulkCreate(req) {
      const {
        payload: { data = [] },
      } = req;

      try {
        return await sequelize.transaction(async (t) => {
          return await Promise.all(
            data?.map(async (user) => await createNew(user))
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

    // RETRIEVE------------------------------------------------------------

    /**
     * @function bulkList - Fetched multiple User
     * @param {Object} req
     * @returns
     */
    async bulkRetrieve(req) {
      try {
        const { query } = req;
        const queryFilters = await filters({ query, searchFields: ["email"] });

        const include = filterAssociations(query?.include);

        const options = {
          ...queryFilters,
          attributes: { exclude: ["password"] },
          include,
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
    async sendOTP(req, h) {
      const {
        payload: { id },
      } = req;

      try {
        if (!id)
          throw boom.badData("Required payload, <id::uuid> is not provided!");

        let user = await User.findByPk(id);
        if (!user) throw boom.notFound(`Account with id, ${id} not found!`);

        // generate OTP
        let otp = generator.otp();
        let otp_ttl = dfn.addMinutes(new Date(), 14);
        let data = { otp, otp_ttl };
        let security = await user.getSecurity();
        security = security
          ? await security.update(data)
          : await user?.createSecurity(data);
        // await user.setSecurity(data);

        // TODO: Send via email or SMS
        return h.response({ sent: true }).code(200);
      } catch (err) {
        console.error(err);
        return boom.internal(err.message, err);
      }
    },

    /**
     * @function verifyOTP - Verifies user OTP code
     * @param {Object} req
     * @returns
     */
    async verifyOTP(req) {
      const {
        payload: { id, code },
      } = req;

      try {
        if (!id || !code)
          throw boom.badData(
            "Required payload value, <id::uuid> or <code::string(5)> is not provided!"
          );
        // Find user
        let user = await User.findByPk(id);
        if (!user) throw boom.notFound(`Account with id, ${id} not found!`);

        //  Check that otp exist and is valid
        let security = await user.getSecurity();
        let now = new Date();
        let isValid = dfn.isBefore(now, security?.otp_ttl);

        return security?.otp === code && isValid
          ? login(user)
          : boom.notFound("OTP code is incorrect. Try again!");
      } catch (err) {
        console.error(err);
        return boom.internal(err.message, err);
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
          payload: { email, access_level = 1, password },
        } = req;
        let where = { email, access_level };

        // fetch user record from DB that matches the email
        let account = await User.findOne({
          where,
          logger: console.log,
        });

        if (account) {
          //  get account Security setting
          let security = await account?.getSecurity();

          return security?.two_factor
            ? {
                id: account?.id,
              }
            : (await decrypt(password, account.password))
            ? login(account, password)
            : boom.notFound("Incorrect password!");
        }

        return boom.notFound(
          "Account not found! May be due to incorrect email or password. Try again!"
        );
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
  };
};

function renameKey(Obj, from = [], to = []) {
  from.forEach((key, idx) => {
    if (key in Obj) {
      let temp = Obj[key];
      delete Obj[key];
      Obj[to[idx]] = temp;
    }
  });
  return Obj;
}


