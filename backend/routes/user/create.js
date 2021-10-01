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
    // user should not be able to set his role only admin should be able to set anothers users role
    role: Joi.string().min(21).required(),
  }).with("password", "repeat_password");

  return {
    method: "POST",
    path: `/user/create`,
    handler: createUser,
    options: {
      validate: {
        payload: schema,
      },
    },
  };
};
