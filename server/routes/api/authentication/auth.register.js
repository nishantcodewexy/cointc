const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      user: { createMe },
    },
    consts: { patterns, roles: _roles },
    helpers:{
      // permissions:{
      //   isAdmin
      // }
    }
  } = server.app;

  // define Joi schema
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required(),
    password: Joi.string()
      .pattern(patterns.password)
      .required(),
    repeat_password: Joi.ref("password"),
    referrer: Joi.string()
      .min(21)
      .optional(),
      // role: Joi.string().min(21).required(),
    // user should not be able to set his role only admin should be able to set anothers users role
  }).with("password", "repeat_password");

  return {
    method: "POST",
    path: `/auth/register`,
    config: {
      handler: createMe,
      validate: {
        payload: schema,
      },
    },
  };
};
