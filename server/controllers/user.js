const assert = require("assert");

module.exports = (server) => {
  const {
    db: { User, AdminProfile, Profile, sequelize },
    boom,
    config: { server_url, client_url },
    helpers: { encrypt, decrypt, mailer, jwt },
    consts: { roles: _roles },
  } = server.app;

  const UserController = {
    async create(req) {
      let { role } = req.pre;
      const { email, password, ...restOfPayload } = req.payload;
      assert(email, boom.badRequest("Expected email"));
      assert(password, boom.badRequest("Expected password field"));

      try {
        const { profile, model } = assertRole(role);
        console.log(model);
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
          _user = await User.create(
            {
              email,
              password,
              role,
              [profile]: { ...restOfPayload, email },
            },
            {
              transaction: t,
              include: [
                {
                  association: profile,
                },
              ],
            }
          );

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
          payload: { email, password },
          pre: { role },
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

        if (_user) {
          return (
            (await decrypt(password, _user.password)) && {
              token: jwt.create(_user),
              ..._user.toPublic(),
            }
          );
        }
        return boom.notFound("User not found");
      } catch (error) {
        console.error(error);
        return boom.boomify(error);
      }
    },

    // async createUser(req) {
    //   const { email, password } = req.payload;
    //   let { role } = req.pre;
    //   assert(email, boom.badRequest("Expected email"));
    //   assert(password, boom.badRequest("Expected password field"));

    //   let _user; // = await createUser({ email, password, role: "standard" });
    //   try {
    //     return await sequelize.transaction(async (t) => {
    //       _user = await User.create({
    //         email,
    //         password,
    //         role,
    //       });

    //       let _profile = await _user.createProfile(
    //         {
    //           ...restOfPayload,
    //         },
    //         {}
    //       );
    //       return _profile;
    //     });
    //   } catch (err) {}
    //   return _user;
    //   if (_user) {
    //     // TODO: create standard user profile
    //     // TODO: Send mail
    //     // const token = jwt.create(_user, 900);
    //     /*
    //   let confirmationLink = `${server_url}/confim_email?email=${email}&code=${token}`;
    //   // Send email verification
    //   const mailObject = {
    //     to: email,
    //     htmlTemplate: {
    //       name: "account_confirmation",
    //       transform: {
    //         confirmationLink,
    //         recipientEmail: email,
    //       },
    //     },
    //     subject: "Cryptcon - Account confirmation",
    //   };

    //   await mailer.sendMail(mailObject); */
    //   }
    // },

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
        let { user: id, role } = req.pre;

        const { profile } = assertRole(role);

        return await User.findOne({
          where: { id, role },
          include: {
            association: profile,
          },
        }).then((_user) => _user.toPublic());
      } catch (error) {
        console.error(error);
        return boom.boomify(error);
      }
    },

    findID: async (req) => {
      try {
        // get user ID from preHandler
        let {
          params: { id },
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
      const {
        payload,
        pre: { user },
      } = req;
      return {
        updated: Boolean(
          await User.update({ ...payload }, { where: { id: user } })
        ),
      };
    },
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
      case _roles.standard:
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

  return UserController;
};
