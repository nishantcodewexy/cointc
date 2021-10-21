const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      user: { resetPassword },
    },
    consts: { patterns },
    helpers: {
      jwt: { decodeUser },
    },
  } = server.app;

  const schema = Joi.object({
    password: Joi.string().pattern(patterns.password).required(),
    repeat_password: Joi.ref("password"),
  }).with("password", "repeat_password");

  return {
    method: "POST",
    path: "/user/password_reset",
    config: {
      pre: [
        {
          method: decodeUser,
          assign: "user",
        },
      ],
      handler: resetPassword,
      validate: {
        payload: schema,
      },
      auth: "jwt",
    },
  };
};
