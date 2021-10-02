const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      user: { authenticate },
    },
    consts: { patterns, roles: _roles },
  } = server.app;

  // define Joi schema
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().pattern(patterns.password).required(),
    role: Joi.any().allow(Object.keys(_roles).join(",")).required(),
  }).with("email", "password");

  return {
    method: "POST",
    path: "/account/authenticate",
    config: {
      handler: authenticate,
      validate: {
        payload: schema,
      },
    },
  };
};
