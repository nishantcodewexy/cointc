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
  }).with('email', 'password');

  return {
    method: "POST",
    path: "/admin/authenticate",
    config: {
      pre: [{
        method: () => _roles.admin,
        assign: 'role'
      }],
      handler: authenticate,
      validate: {
        payload: schema,
      },
    },
  };
};
