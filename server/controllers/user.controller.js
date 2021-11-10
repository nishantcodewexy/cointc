"use strict";
const assert = require("assert");
const dfn = require("date-fns");
const faker = require("faker");
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
      Profile,
      sequelize,
      Sequelize: { Op },
    },
    boom,
    config: { client_url },
    helpers: {
      decrypt,
      jwt,
      generator,
      paginator,
      filters,
      validateAndFilterAssociation,
    },
    mailer: { sendMail, mailerOptions, mailerTemplates },
  } = server.app;

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
      let extraComment, confirmationLink;

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
        extraComment += `<div><p>Generated password: <em>${password}</em></p> <strong>We strongly advise that you change your password later!</strong></div>`;
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
        if (+access_level < 2) {
          // create user wallet
          // await user.createWallet({ currency: "BTC" }, { transaction: t });
          // create user Kyc
          await user.createKyc({ type: "id" }, { transaction: t });
          // await user.createAddress({ }, { transaction: t });

          // if there's an invite code, relate users
          if (others?.invite_code) {
            let where = {
              invite_code: others.invite_code,
            };
            let ref = await Profile.findOne({ where });

            if (ref) {
              ref = await ref.getUser();
              ref = await ref.addUser_referral(user, { transaction: t });
            }
          }
        }

        //TODO Send mail to user
        sendMail(
          {
            template: "account_confirmation",
            transforms: {
              recipientEmail: email,
              extraComment,
              password,
              confirmationLink,
            },
            subject: "Cointc - New account confirmation",
            to: email,
          },
          (err, info) => {
            if (err) console.error(info, error);
            else console.log(info);
          }
        );

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

  return {
    // CREATE------------------------------------------------------------
    /**
     * @function create
     * @description - Creates new user record (**Admins only**)
     * @param {Object} req - Request object
     * @param {Object} req.pre - Request Prehandler object
     * @returns
     */
    /**
     * @function registerMe - registers or creates a new user record
     * @param {Object} req - Request object
     * @returns
     */
    async register(req) {
      let { payload } = req;

      try {
        return createNew(payload);
      } catch (error) {
        console.error(error);
        return boom.boomify(error);
      }
    },
    async create(req) {
      let {
        payload,
        pre: {
          user: { user, sudo },
        },
      } = req;

      try {
        return createNew(payload, user);
      } catch (error) {
        console.error(error);
        return boom.boomify(error);
      }
    },

    // UPDATE------------------------------------------------------------

    /**
     * @function update - updates single user record - (**only Admin**)
     * @param {Object} req
     * @param {Object} req.payload
     * @param {Object} req.payload.data  - upsert record
     * @returns
     */
    async updateByID(req) {
      try {
        let {
          payload,
          params: { id },
          pre: {
            user: { user, sudo },
          },
        } = req;
        let fields = ["permission"];
        let result = await User.update(payload, {
          where: { id },
          returning: true,
          fields,
          logging: console.log,
        }).then(([count]) => count);

        return sudo
          ? {
              id,
              status: Boolean(result),
            }
          : boom.methodNotAllowed(
              `User with ID ${user?.id} is not an administrator`
            );
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
    async update(req) {
      try {
        const {
          payload,
          pre: {
            user: { user, sudo },
          },
        } = req;
        let fields = ["active"],
          result;

        if (sudo) {
          let { ids = [], ...data } = payload;
          fields = [...fields, "permission"];
          if (!ids?.length) throw boom.badData(`<ids::array> cannot be empty`);

          if (!data) return boom.methodNotAllowed("Nothing to update");

          result = await sequelize.transaction(async (t) => {
            return await Promise.all(
              ids.map(
                async (id) =>
                  await Promise.all([
                    __update("User", data, {
                      where: { id },
                      transaction: t,
                      fields,
                    }),
                  ])
              )
            );
          });
        } else {
          // update session user data
          result = await user?.update(payload, {
            fields,
          });
        }
        return {
          status: Boolean(result),
          result,
        };
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
    async remove(req) {
      const {
        payload: { data = [], force = false },
        pre: {
          user: { user, sudo },
        },
      } = req;
      let result, where;
      try {
        if (sudo) {
          if (!data?.length)
            throw boom.badData("Expected an array of user IDs. None provided!");
          result = await sequelize.transaction(
            async (t) =>
              await Promise.all([
                data.map(async (id) => {
                  if (id === user?.id)
                    throw boom.methodNotAllowed(
                      "Cannot remove current user session data. Remove current user ID from data and try again or make request without sudo, force and data as request payloads!"
                    );
                  where = { id };
                  return await User.destroy({ where, force, transaction: t });
                }),
              ]).catch((err) => (error = err))
          );
        } else {
          where = { id: user?.id };
          result = await user.destroy({ force });
        }

        return {
          status: Boolean(result),
          result,
        };
      } catch (err) {
        console.error(err);
        return boom.internal(err.message, err);
      }
    },

    /**
     * @function remove - Remove single record by ID
     * @param {Object} req
     * @returns
     */
    async removeByID(req) {
      let {
        payload: { force = false },
        params: { id },
        pre: {
          user: { user, sudo },
        },
      } = req;
      // only superadmins are allowed to permanently delete a user
      force = user?.isSuperAdmin ? force : false;
      let where = { id };
      let result = await __destroy("User", where, force);
      return { status: Boolean(result), result };
    },

    // RETRIEVE------------------------------------------------------------

    /**
     * @function find - Fetched multiple User
     * @param {Object} req
     * @returns
     */
    async find(req) {
      const {
        query,
        pre: {
          user: { user, fake, sudo },
        },
      } = req;

      try {
        const queryFilters = await filters({
          query,
          searchFields: ["email"],
          extras: {
            ...(!sudo && { id: user?.id }),
          },
        });

        const include = validateAndFilterAssociation(
          query?.include,
          ["security"],
          User
        );

        const options = {
          ...queryFilters,
          // attributes: { exclude: ["password"] },
          include,
        };
        const { limit, offset } = queryFilters;

        if (sudo) {
          let queryset = fake
            ? await User.FAKE(limit)
            : await User.findAndCountAll(options);

          return paginator({
            queryset,
            limit,
            offset,
          });
        }

        return {
          result: fake ? await User.FAKE() : await User.findOne(options),
        };
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
    async findByID(req) {
      const {
        params: { id },
        pre: {
          user: { fake, sudo },
        },
      } = req;
      try {
        // handle invalid params <id> 400
        if (!id)
          return boom.badData(
            `Required params id is ${id}. Check id value and try again!`
          );

        if (sudo) {
          let target_user = fake
            ? await User.FAKE()
            : await User.findOne({
                where: { id },
              });

          return target_user
            ? {
                result: target_user,
                status: "success",
                message: "User found",
              }
            : boom.notFound(`User with ID: ${id} does not exist!`);
        }
        return boom.unauthorized("You are not authorized to access this data");
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

        let security = await user.getSecurity();
        // generate OTP
        let otp = generator.otp();
        let otp_ttl = dfn.addMinutes(new Date(), 14);
        let data = { otp, otp_ttl };

        if (security) {
          // if user created_at from now is less than a minute; don't create new otp
          let now = new Date();
          let former = new Date(security?.updatedAt);
          let diff = dfn.differenceInSeconds(now, former, {
            roundingMethod: "floor",
          });
          if (diff < 60)
            return boom.badRequest(`Try again after ${60 - diff} secs`);
          await security.update(data);
        } else await user?.createSecurity(data);

        // TODO: Send via email or SMS
        return h
          .response({
            status: true,
            message: "OTP sent successfully",
            data: {
              phone_number: user?.phone,
              email: user?.email,
              id,
            },
          })
          .code(200);
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
          ? login(user, jwt.create(user))
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
        let user = await User.findOne({
          where,
          logger: console.log,
          trim: false,
        });

        if (user) {
          //  get account Security setting
          let security = await user?.getSecurity();

          return security?.two_factor
            ? {
                id: user?.id,
                status: true,
                message:
                  "2FA enabled. Send OTP using the user ID to complete the authentication ",
              }
            : (await decrypt(password, user?.password))
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
async function login(account, token) {
  // Update the last_login
  account.login_at = new Date();
  await account?.save();

  return {
    token,
    user: { ...account.toPublic() },
  };
}
