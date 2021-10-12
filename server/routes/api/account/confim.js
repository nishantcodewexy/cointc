const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      user: { confirmByEmail },
    },
  } = server.app;

  // define Joi schema
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    token: Joi.string().required(),
  }).with("token", "email");

  return {
    method: "GET",
    path: `/auth/confirm`,
    config: {
      handler: confirmByEmail,
      validate: {
        query: schema,
      },
    },
  };
};
