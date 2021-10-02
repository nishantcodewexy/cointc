const assert = require("assert");

module.exports = (server) => {
  const {
    db,
    db: { User, sequelize },
    boom,
    config: {  client_url },
    helpers: {  decrypt, mailer, jwt },
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
        const { profile } = assertRole(role);

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
          payload: { email, role, password },
        } = req;

        const { profile, profile_attributes } = assertRole(role);

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

    confirmEmail: async (req) => {
      let { email, token } = req.query;
      assert(email, boom.badRequest("Missing credential to confirm email"));
      assert(token, boom.badRequest("Missing credential to confirm email"));

      const decoded = jwt.decodeAndVerify(token);
      return decoded.isValid
        ? await User.update(
            { kyc: { email: { confirmed: true } } },
            { where: { id: decoded.payload.user } }
          ).catch(boom.boomify)
        : boom.unauthorized("Cannot confirm user account!");
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
        let { user: id } = req.pre;
        let { role } = req.query;

        const { profile } = assertRole(role);

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

    async kyc(req) {
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

    // Temporarily delete user record
    archive: async (req) => {
      // get user ID from preHandler
      let { user } = req.pre;
      return await User.destroy({ where: { id: user } });
    },

    // Permanently destroy user record
    destroy: async (req) => {
      // get user ID from preHandler
      let { user } = req.pre;
      return db.sequelize.destroy({ where: { id: user }, force: true });
    },

    async update(req) {
      try {
        const {
          payload: { __update, __password = null },
          pre: { user },
        } = req;

        /**
         * @function performUpdate - Function signature that actually performs the update
         * @param {Object} payload
         * @returns Object
         */
        const performUpdate = async (payload, updateOptions) => {
          // Critical updates that require user password authentication to update
          const allowedUpdates = ["mode", "nickname", "last_name"];
         
          // Checks if there's a critical update to make
          const hasCriticalUpdate = (updateObject) =>
            Boolean(allowedUpdates.find((item) => !(item in updateObject)));
          let critical = hasCriticalUpdate(payload);
          
          // Find user
          const __user = await User.findOne({ where: { id: user } });
          // get user role to determine which profile to update
          const { profile, model } = assertRole(__user?.role);

          console.log({ model, profile, critical });
          // Update operation response
          const updateResponse = async () => ({
            updated: await db[model]
              .update(
                { ...payload },
                { where: { user_id: user } },
                { ...updateOptions, returning: true }
              )
              .then((result) => result),
          });

          return critical
            ? __password
              ? (await decrypt(__password, __user.password)) && updateResponse()
              : boom.notAcceptable("Critical update")
            : updateResponse();
        };

        // bulk update
        if (Array.isArray(__update)) {
          //TODO: Run a transaction
          return await sequelize.transaction(async (t) => {
            __update.forEach((_obj) => {
              performUpdate(_obj, { transaction: t });
            });
          });
        }
        return performUpdate(__update);
      } catch (error) {
        console.error(error);
        return boom.boomify(error);
      }
    },
  };

  const UserGroupController = (req, h) => {
    console.log("User group controller called!");
  };

  // **************************************************
  function assertRole(role) {
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
        console.error(`Bad user role specified`, role);
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
