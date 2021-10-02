const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      user: { create },
    },
    consts: { patterns, roles: _roles },
  } = server.app;

  // define Joi schema
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().pattern(patterns.password).required(),
    repeat_password: Joi.ref("password"),
  }).with("password", "repeat_password");

  return {
    method: "POST",
    path: `/account`,
    config: {
      pre: [
        {
          method: () => _roles.basic,
          assign: "role",
        },
      ],
      handler: create,
      validate: {
        payload: schema,
      },
    },
  };
};
