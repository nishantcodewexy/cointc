"use strict";
const assert = require("assert");
const faker = require("faker");
const { login } = require("./security.controller");
const dateFn = require("date-fns");
/**
 * @description - User controller
 * @param {Object} server  - Server instance
 * @returns
 */
module.exports = function UserController(server) {
  /*********************** HELPERS ***************************/
  const { __update, __destroy } = require("./utils")(server);

  const {
    db: {
      User,
      sequelize,
      Analytics,
      Sequelize: { Op },
    },
    boom,
    config: { client_url },
    helpers: { decrypt, mailer, jwt, paginator, filters },
  } = server.app;

  async function modify(target_user, data, { profileFields, userFields }) {
    try {
      let target_user_profile = await target_user.getProfile();

      const { profile, ...others } = data;

      let _updatedUser = await target_user.update(others, {
        returning: true,
        ...(userFields && { fields: userFields }),
        logging: console.log,
      });
      let _updatedProfile = await target_user_profile.update(profile, {
        returning: true,
        ...(profileFields && { fields: profileFields }),
        logging: console.log,
      });

      return {
        ..._updatedUser?.dataValues,
        ..._updatedProfile?.dataValues,
      };
    } catch (err) {
      console.error(err);
    }
  }
  /**
   * @function createNew - Creates a new user record
   * @param {Object} payload - Payload object
   * @param {Object} created_by - Creator as a user
   * @returns
   */
  async function createNew(
    { email, password = null, access_level = 1, repeat_password, ...others },
    created_by = null
  ) {
    try {
      let mailBody = "";

      // Verifications
      if (password && password !== repeat_password)
        throw boom.badData(`Password mismatch!`);

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
            access_level,
            ...(created_by && { created_by }),
          },
          options: {
            transaction: t,
          },
        };

        // User
        user = await User.create(newUser.data, newUser.options);

        // Profile
        await user.createProfile(
          {
            email,
            ...others,
          },
          {
            transaction: t,
          }
        );

        // Security
        await user.createSecurity({}, { transaction: t });

        // Standard user operations
        +access_level < 2 &&
          await (async () => {
            await user
              .createWallet({ currency: "BTC" }, { transaction: t })
              .catch(console.error);

            // Set referral link id any
            if (others?.invite_code) {
              const ref = await User.findOne({
                where: {
                  "profile.invite_code": invite_code,
                },
              });
              ref && ref.addReferrer(user, { transaction: t });
            }
          })();

        //TODO Send mail to user

        return {
          result: user.toPublic(),
          message: "User created successfully",
          status: true,
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
     * @function create
     * @description - Creates new user record (**Admins only**)
     * @param {Object} req - Request object
     * @param {Object} req.pre - Request Prehandler object
     * @returns
     */
    async create(req) {
      let {
        payload,
        pre: { user },
      } = req;

      try {
        return createNew(payload, user);
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

        let profileFields = [
          "lname",
          "oname",
          "pname",
          "mode",
          "payment_methods",
        ];
        return {
          result: await modify(user, payload, {
            profileFields,
          }),
        };
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
          payload,
          params: { id },
        } = req;

        let target_user = await User.findByPk(id);
        if (!target_user) return boom.notFound(`User with id ${id} not found`);

        let userFields = ["permission"];
        let profileFields = ["is_verified", "suitability"];

        return {
          result: await modify(target_user, payload, {
            userFields,
            profileFields,
          }),
        };
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
          pre: { user },
        } = req;

        // allowed fields
        let fields = [];

        return await sequelize.transaction(async (t) => {
          return await Promise.all(
            data.map(async ({ id, ...payload }) => {
              if (suspend) {
                payload = {
                  ...payload,
                  archived_at: new Date().toLocaleString(),
                };
              }
              let where = {
                id,
              };
              return await __update("User", payload, where, {
                transaction: t,
                fields,
              });
            })
          );
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

      if (!data?.length) throw boom.badRequest("No ID provided");
      return {
        deleted: Boolean(
          await sequelize.transaction(async (t) => {
            await Promise.all([
              data.map(async (id) => {
                let where = { id };
                await __destroy("User", where, force, { transaction: t });
              }),
            ]);
          })
        ),
      };
    },

    /**
     * @function remove - Remove single User
     * @param {Object} req
     * @returns
     */
    async removeMe(req) {
      let {
        pre: { user },
      } = req;
      // only superadmins are allowed to permanently delete a user
      let force = false;
      let where = { id: user?.id };
      return { deleted: Boolean(await __destroy("User", where, force)) };
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
        pre: { user },
      } = req;
      // only superadmins are allowed to permanently delete a user
      force = user?.isSuperAdmin ? force : false;
      let where = { id };
      return { deleted: Boolean(await __destroy("User", where, force)) };
    },

    // RETRIEVE------------------------------------------------------------

    /**
     * @function bulkRetrieve - Fetched multiple User
     * @param {Object} req
     * @returns
     */
    async bulkRetrieve(req) {
      const { query } = req;
      try {
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
    async retrieveMe(req) {
      const {
        pre: { user },
      } = req;
      try {
        // Find target user
        return user
          ? {
              result: user?.toPublic(),
              status: "success",
              message: "User found",
            }
          : boom.notFound("User not found!");
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
        params: { id },
      } = req;
      try {
        // handle invalid params <id> 400
        if (!id)
          return boom.badData(
            `Required params id is ${id}. Check id value and try again!`
          );

        // Find target user
        return await User.findOne({
          where: { id },
        }).then(
          (target_user) => ({
            result: target_user?.toPublic(),
            status: "success",
            message: "User found",
          }),
          boom.notFound
        );
      } catch (error) {
        console.error(error);
        return boom.boomify(error);
      }
    },

    // OTHERS------------------------------------------------------------

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
        let user = await User.findOne({
          where,
          logger: console.log,
        });

        if (user) {
          //  get account Security setting
          let security = await user?.getSecurity();

          return security?.two_factor
            ? {
                id: user?.id,
              }
            : (await decrypt(password, user.password))
            ? login(user, jwt.create(user))
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

    /**
     * @function registerMe - registers or creates a new user record
     * @param {Object} req - Request object
     * @returns
     */
    async registerMe(req) {
      let { payload } = req;

      try {
        return createNew(payload);
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
