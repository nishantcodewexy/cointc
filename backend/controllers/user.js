const assert = require("assert");

module.exports = (server) => {
  const {
    db: { User, AdminProfile, Profile, sequelize },
    boom,
    config: { server_url, client_url },
    helpers: { encrypt, decrypt, mailer, jwt },
  } = server.app;

  return {
    async createAdmin(req) {
      const { email, password, role = "admin", ...restOfPayload } = req.payload;
      assert(email, boom.badRequest("Expected email"));
      assert(password, boom.badRequest("Expected password field"));
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
          _user = await User.create({
            email,
            password,
            role,
          });

          let _profile = await _user.createAdminProfile(
            {
              ...restOfPayload,
            },
            {}
          );
          return _profile;
        });
      } catch (error) {
        console.error(error);
        return boom.boomify(error);
      }
    },

    async authenticateAdmin(req) {
      const { email, password } = req.payload;
      const { Op } = sequelize;
      // fetch user record from DB that matches the email
      return await User.findOne({
        where: { email, role: "admin" },
        include: {
          model: AdminProfile,
          attributes: [
            "id",
            "kyc",
            "created_at",
            "updated_at",
            "last_login",
            "nickname",
            "archived_at",
          ],
          include: {
            model: User,
            as: "user",
            attributes: ["email", "role", "created_at"],
          },
        },
      })
        .then(async (_user) => {
          if (_user) {
            return (
              (await decrypt(password, _user.password)) && {
                access_token: jwt.create(_user),
                profile: _user.AdminProfile,
              }
            );
          }
          throw new Error("User not found");
        })
        .catch(boom.notFound);
    },

    async createUser(req) {
      const { email, password } = req.payload;
      let _user; // = await createUser({ email, password, role: "standard" });
      try {
        return await sequelize.transaction(async (t) => {
          _user = await User.create({
            email,
            password,
            role,
          });

          let _profile = await _user.createProfile(
            {
              ...restOfPayload,
            },
            {}
          );
          return _profile;
        });
      } catch (err) {}
      return _user;
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

    // authenticate user
    authenticate: async function (req) {
      const { email, password } = req.payload;
      // fetch user record from DB that matches the email
      return await User.findOne({
        where: { email, role: "standard" },
        include: {
          model: Profile,
          // attributes: ["profile"],
        },
      })
        .then(async (_user) => {
          if (_user)
            return (
              (await decrypt(password, _user.password)) && {
                access_token: jwt.create(_user),
              }
            );
          return boom.notFound("User not found");
        })
        .catch(boom.notFound);
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
      let { user: id } = req.pre;
      try {
        const user = await User.findOne({
          where: { id },
        });
        const profile = await user.getProfile();

        return { ...user.toPublic(), profile: profile.toPublic() };
      } catch (error) {
        return boom.boomify(error);
      }
    },

    profileByID: async (req) => {
      // get user ID from preHandler
      let { id } = req.query;

      // handle invalid query <id> 400
      if (!id) return boom.badRequest();

      try {
        const user = await User.findOne({
          where: { id },
        });

        // handle 404
        if (!user) return boom.notFound();

        const profile = await user.getProfile();

        return { ...user.toPublic(), profile: profile.toPublic() };
      } catch (error) {
        // console.error(error);
        return boom.boomify(error);
      }
    },

    getAllUser: async () => {
      return User.findAll({
        include: { association: "profile" },
        attributes: { exclude: ["password"] },
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
};
