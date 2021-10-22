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
    email: Joi.string().email({ minDomainSegments: 2 }).required().error(new Error('Invalid email address')),
    password: Joi.string().pattern(patterns.password).required().error(new Error('Invalid password pattern')  ),
    access_level: Joi.number().max(3).default(1).required(),
  }).with("email", "password");

  return {
    method: "POST",
    path: "/auth/authenticate",
    config: {
      handler: authenticate,
      validate: {
        payload: schema,
      },
    },
  };
};
