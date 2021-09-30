const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      user: { authenticateAdmin },
    },
    consts: { patterns },
  } = server.app;

  // define Joi schema
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().pattern(patterns.password).required(),
  }).with('email', 'password');

  return {
    method: "POST",
    path: "/admin/user/authenticate",
    config: {
      handler: authenticateAdmin,
      validate: {
        payload: schema,
      },
    },
  };
};
