const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      user: { create },
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
    // user should not be able to set his role only admin should be able to set anothers users role
    // role: Joi.string().min(21).required(),
  }).with("password", "repeat_password");

  return {
    method: "POST",
    path: `/auth/register`,
    config: {
      pre: [
        {
          method: () => _roles.basic,
          assign: "role",
        }
      ],
      handler: create,
      validate: {
        payload: schema,
      },
    },
  };
};
