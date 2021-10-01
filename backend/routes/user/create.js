const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      user: { createUser },
    },
    consts: { patterns },
  } = server.app;

  // define Joi schema
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().pattern(patterns.password).required(),
    repeat_password: Joi.ref("password"),
    referrer: Joi.string().min(21).optional(),
    role: Joi.string().min(21).required(),
  }).with("password", "repeat_password");

  return {
    method: "POST",
    path: `/user/create`,
    config: {
      pre: [
        {
          method: () => "standard",
          assign: "role",
        },
      ],
      handler: createUser,
      validate: {
        payload: schema,
      },
    },
  };
};
