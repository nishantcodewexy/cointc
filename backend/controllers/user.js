const assert = require("assert");

module.exports = (server) => {
  const {
    db: { User, Profile, sequelize },
    boom,
    config: { server_url, client_url },
    helpers: { decrypt, mailer, jwt },
  } = server.app;

  return {
    // Creates new user
    create: async function (req) {
      try {
        const { email, password } = req.payload;

        assert(email, boom.badRequest("Expected email"));
        assert(password, boom.badRequest("Expected password field"));

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

        // create JWT token to email
        // const token = jwt.create({_user,}, 900);
        // debugger;
        //TODO: Create blockchain wallets

        // TODO: using transactions to complete user accout creation
        const t = await sequelize.transaction();
        try {
          _user = await User.create({
            ...req.payload,
            role: "standard",
          });

          const _profile = await Profile.create({ email });
          await _user.addProfile(_profile);

          await t.commit();
        } catch (error) {
          await t.rollback();
        }
        // transaction ends

        return _user;

        // TODO:Create new wallet record

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
        // Save
        await _user.save({
          fields: ["email", "password", "referrerId"],
        });
        // Send mail
        await mailer.sendMail(mailObject);

        return { access_token: jwt.create(user) };
      } catch (err) {
        console.error(err);
        return boom.boomify(err);
      }
    },

    // authenticate user
    authenticate: async function (req) {
      const { email, password } = req.payload;

      // fetch user record from DB that matches the email
      return await User.findOne({
        where: { email },
        include: {
          model: Profile,
          attributes: ["profile"],
        },
      })
        .then(
          async (_user) =>
            (await decrypt(password, _user.password)) && {
              access_token: jwt.create(_user),
            }
        )
        .catch(boom.boomify);
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
