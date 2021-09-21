const assert = require("assert");

module.exports = (server) => {
  const {
    db,
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
        let _user = await db.User.findOne({
          where: {
            email,
          },
        });

        if (_user)
          throw boom.notAcceptable(
            `User with the email: ${email} already exist`
          );

        // create JWT token to email
        const token = jwt.create(_user, 900);
        debugger;
        //TODO: Create blockchain wallets
        
        _user = await db.User.build({
          ...req.payload,
        });

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
      return await db.User.findOne({
        where: { email },
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
        ? await db.User.update(
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
        const user = db.User.findOne({ where: { email } });

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
      let { user } = req.pre;
      let profile = await db.User.findOne({ where: { id: user } }).then(
        (data) => data.profile
      );
      return profile;
    },

    profileByID: async (req) => {
      // get user ID from preHandler
      let { payload: {id} } = req;
      return await db.User.findOne({ where: { id } }).then(
        (user) => user.profile
      ).catch(boom.boomify)
    },

    // Temporarily delete user record
    archive: async (req) => {
      // get user ID from preHandler
      let { user } = req.pre;
      return await db.User.destroy({ where: { id: user } });
    },

    // Permanently destroy user record
    destroy: async (req) => {
      // get user ID from preHandler
      let { user } = req.pre;
      return db.sequelize.query(`DELETE FROM tbl_users WHERE id = ${user}`, {
        model: db.User,
        mapToModel: true, // pass true here if you have any mapped fields
      });
    },

    async update(req) {
      const {
        payload,
        pre: { user },
      } = req;
      return {
        updated: Boolean(
          await db.User.update({ ...payload }, { where: { id: user } })
        ),
      };
    },
  };
};
