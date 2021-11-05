const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      address: { findByUserID },
    },
    helpers: {
      permissions: { isAdminOrError },
    },
  } = server.app;

  let schema = Joi.object().keys({
    user_id: Joi.string().uuid(),
  });
  return {
    method: "GET",
    path: "/address/{user_id}",
    config: {
      pre: [
        {
          method: isAdminOrError,
          assign: "user",
        },
      ],
      handler: findByUserID,
      auth: "jwt",
      validate: {
        params: schema,
      },
    },
  };
};
