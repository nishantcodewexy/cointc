const assert = require("assert");

module.exports = (server) => {
  const {
    db,
    db: { User, sequelize },
    boom,
    config: { client_url },
    helpers: { decrypt, mailer, jwt },
    consts: { roles: _roles },
  } = server.app;

  const UserController = {
    async create(req) {
      const {
        pre: { role },
        payload: { email, password, __profile = true, ...restOfPayload },
      } = req;
      assert(email, boom.badRequest("Expected email"));
      assert(password, boom.badRequest("Expected password field"));

      try {
        const { profile } = __assertRole(role);

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
            cols: { email, password, role },
            options: { transaction: t },
          };

          // Create user profile only if the __profile payload is true
          if (__profile) {
            newUser.cols["profile"] = { email, password, ...restOfPayload };
            newUser.options["include"] = [
              {
                association: profile,
              },
            ];
          }

          _user = await User.create(newUser.cols, newUser.options);

          /******** Send mail to user ***************/
          let genPassword = "";
          // if user profile was not created, generate temporal password for user
          if (__profile) {
            // TODO: generate temporal password
          }
          // Send mail here...
          /************ End send mail ***************/

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

    async authenticate(req) {
      try {
        const {
          payload: { email, role = _roles.basic, password },
        } = req;

        const { profile, profile_attributes } = __assertRole(role);

        // fetch user record from DB that matches the email
        let _user = await User.findOne({
          where: { email, role },
          include: {
            association: profile,
            attributes: profile_attributes,
            required: true,
            right: true,
          },
        });

        return _user
          ? (await decrypt(password, _user.password)) && {
              token: jwt.create(_user),
              ..._user.toPublic(),
            }
          : boom.notFound("User not found");
      } catch (error) {
        console.error(error);
        return boom.boomify(error);
      }
    },

    async createUser(req) {
      const { email, password } = req.payload;
      const _user = await createUser({ email, password, role: "standard" });
      if (_user) {
        // TODO: create standard user profile
        // TODO: Send mail
        // const token = jwt.create(_user, 900);
        /* 
      let confirmationLink = `${server_url}/confim_email?email=${email}&code=${token}`;
      // Send email verification
      const mailObject = {
        to: email,
        htmlTemplate: {
          name: "account_confirmation",
          transform: {
            confirmationLink,
            recipientEmail: email,
          },
        },
        subject: "Cryptcon - Account confirmation",
      };
      
      await mailer.sendMail(mailObject); */
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

    resetPassword: async function (req) {
      let { password, token } = req.payload;
      // decrypt jwt token
      return (
        jwt.decodeAndVerify(token) &&
        user.update({ password }, { where: { id: user_id } })
      );
    },

    requestPasswordReset: async function (req) {
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

    profile: async (req) => {
      // get user ID from preHandler
      try {
        let {
          user: { role, id },
        } = req.pre;

        const { profile } = __assertRole(role);

        return await User.findOne({
          where: { id, role },
          include: {
            association: profile,
          },
        }).then((_user) => _user.toPublic());
      } catch (error) {
        console.error(error);
        return boom.badRequest(error);
      }
    },

    kyc: async (req) => {
      
      return await this.profile(req)
        .then((data) => {
          let kyc = data.kyc;
          const { type } = req.params;
          return type ? { [type]: kyc[type] } : kyc;
        })
        .catch(boom.boomify);
    },

    async findID(req) {
      try {
        // get user ID from preHandler
        let {
          query: { id },
          pre: { user },
        } = req;

        // handle invalid query <id> 400
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

    getAllUser: async () => {
      let limit = 20;
      return User.findAndCountAll({
        include: { association: "profile" },
        attributes: { exclude: ["password"] },
        limit,
      })
        .then((users) => users.map((user) => user.toJSON()))
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
     * @param {Array} req.payload.data  - array of upsert ids records
     * @returns
     */
    remove: async (req, h) => {
      const {
        payload: { data, soft },
      } = req;

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

  // **************************************************
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

    let model = profile
      .split("_")
      .map((_p) => _p.charAt(0).toUpperCase() + _p.slice(1, +_p.length))
      .join("");
    return { profile, profile_attributes, model };
  }

  return { ...UserController, group: UserGroupController };
};
