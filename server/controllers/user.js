const assert = require("assert");
const searchBuilder = require('sequelize-search-builder');
const Sequelize = require("sequelize")

/**
 * @description - User controller
 * @param {Object} server  - Server instance
 * @returns
 */
module.exports = (server) => {
  const {
    db,
    db: { User, sequelize },
    boom,
    config: { client_url },
    helpers: { decrypt, mailer, jwt, generator,paginator,filters },
    consts: { roles: _roles },
  } = server.app;

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
        payload: { email, password, ...restOfPayload },
      } = req;

      assert(email, boom.badRequest("Expected email"));

      try {
        const { profile } = __assertRole(role);

        // Determines whether to mail password to user
        let mail_secret = !password;

        // Generate password if one is not supplied
        if (mail_secret) {
          debugger;
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

          return {
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

        const { getter } = __assertRole(role);

        // fetch user record from DB that matches the email
        let account = await User.findOne({
          where: { email, role },
        });

        if (account) {
          // lazy load profile attached to account
          let account_profile = await account[getter]();
          // Check if password matches
          if (await decrypt(password, account.password)) {
            // Update the last_login attribute of the account's profile
            await account_profile.update({
              last_login: new Date(Date.now()),
            });

            return {
              token: jwt.create(account),
              ...account.toPublic(),
              ...account_profile.dataValues,
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
          pre: { user },
        } = req;

        // handle invalid params <id> 400
        if (!id) return boom.badRequest();

        const role = await User.findOne({
          where: { id: user },
        })
          .then((_user) => _user.role)
          .catch((error) => {
            throw new Error(`User Controller:findID - ${error.message}`);
          });

        // Do not allow standard users to find admins
        let where = role == _roles.standard ? { id, role } : { id };

        // Find target user
        return await User.findOne({
          where,
        }).then(
          (_user) => _user?.toPublic() ?? boom.notFound("User not found!")
        );
      } catch (error) {
        console.error(error);
        return boom.boomify(error);
      }
    },

    getAllUser: async (req) => {
      
      const {
        pre:{
          isAdmin
        },
        query,
      } = req
      console.log("am called")

      if(!isAdmin) throw boom.forbidden("user is not authorize")

      
      const filterRespond = await filters({query,searchFields:[
        "email",
        
      ]})
      const queryset = User.findAndCountAll({
        include: { association: "profile" },
        attributes: { exclude: ["password"] },
        ...filterRespond
      })
      const {limit,offset} = filterRespond
      return paginator({queryset,limit,offset})
      .catch(boom.boomify);
    },

    // Permanently destroy user record
    remove: async (req) => {
      // get user ID from preHandler
      let {
        pre: { user },
        payload: { soft = true },
      } = req;
      let where = { id: user.id };
      return { deleted: Boolean(await __destroy(where, soft)) };
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
          pre: { user },
          payload: { data /* authorization = null */ },
        } = req;
        // TODO: authorization
        const { model } = __assertRole(user?.role);
        let where = {
          user_id: user.id,
        };

        const attributes = ["mode", "nickname"];
        return { updated: __upsert(model, data, where, { attributes }) };
      } catch (error) {
        console.error(error);
        return boom.boomify(error);
      }
    },
  };

  const UserGroupController = {
    /**
     * @function remove - remove user records
     * @param {Object} req  - request object
     * @param {Object} req.payload  - request body
     * @param {Array} req.payload.data  - array of upsert ids records
     * @returns
     */
    remove: async (req, h) => {
      const {
        payload: { data, soft },
        params:{id},
        pre:{
          isAdmin
        }
      } = req;

      if(!isAdmin) throw boom.forbidden("unauthorized")

      if(id){
        data = [id]
        if(!soft) soft=true
      }
      return {
        deleted: Boolean(
          await sequelize.transaction(async (t) => {
            data.forEach(async (id) => {
              let where = { id };
              await __destroy(where, soft, { transaction: t });
            });
          })
        ),
      };
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
          payload: { data, authorization = null },
        } = req;
        // TODO: authorization
        const attributes = ["mode", "nickname"];

        return await sequelize.transaction(async (t) => {
          data.forEach(async ({ id, ...payload }) => {
            // Find user
            const __user = await User.findOne({ where: { id } });
            // get user role to determine which profile to update
            const { model } = __assertRole(__user?.role);

            let where = {
              user_id: id,
            };
            __upsert(model, payload, where, { transaction: t, attributes });
          });
        });
      } catch (error) {
        console.error(error);
        return boom.boomify(error);
      }
    },

    getMany: async (req, h) => {
      let limit = 20;
      return User.findAndCountAll({
        include: { association: "profile" },
        attributes: { exclude: ["password"] },
        limit,
      })
        .then((users) => users.map((user) => user.toJSON()))
        .catch(boom.boomify);
    },

    async get(req, h) {
      let { id } = query;
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
  };

  /*********************** HELPERS ***************************/
  async function __destroy(where, soft, options = {}) {
    return soft
      ? await User.destroy({ where })
      : db.sequelize.destroy({ where, force: true }, options);
  }

  async function __upsert(model, with_payload, where, options) {
    return await db[model].update(
      { ...with_payload },
      { where },
      { ...options, returning: true }
    );
  }
  function __assertRole(role) {
    let profile, profile_attributes;
    switch (role) {
      case _roles.admin:
        profile = "admin_profile";
        profile_attributes = [
          "id",
          "kyc",
          "created_at",
          "updated_at",
          "last_login",
          "nickname",
          "archived_at",
        ];
        break;
      case _roles.basic:
        profile = "profile";
        profile_attributes = [
          "id",
          "email",
          "mode",
          "nickname",
          "kyc",
          "referral_code",
          "referrerId",
          "last_login",
          "archived_at",
        ];
        break;
      default:
        console.error(`Unrecognized user role ->`, role);
        throw new Error("User operation not allowed: Bad role");
    }
    let accessors = User.associations[profile]["accessors"];

    let getter = accessors?.get;
    let setter = accessors?.set;
    let creator = accessors?.create;

    let model = profile
      .split("_")
      .map((_p) => _p.charAt(0).toUpperCase() + _p.slice(1, +_p.length))
      .join("");
    return { profile, profile_attributes, model, getter, setter, creator };
  }

  return { ...UserController, group: UserGroupController };
};
