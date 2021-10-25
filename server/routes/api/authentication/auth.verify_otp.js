const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      user: { verifyOTP },
    },
    boom,
  } = server.app;

  // define Joi schema
  const schema = Joi.object({
    id: Joi.string()
      .uuid()
      .required()
      .error(boom.badRequest("Required input <id::uuid> is invalid")),
    code : Joi.string().length(5).required().error(boom.badRequest('Required input <code::string(5)> is invalid'))
  });

  return {
    method: "POST",
    path: "/auth/verify",
    config: {
      handler: verifyOTP,
      validate: {
        payload: schema,
      },
    },
  };
};
