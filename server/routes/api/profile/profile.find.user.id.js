const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      profile: { findByUserID },
    },
    helpers: {
      permissions: { isAdminOrError },
    },
  } = server.app;

  return {
    method: "GET",
    path: "/profile/{user_id}",
    config: {
      pre: [
        {
          method: isAdminOrError,
          assign: "user",
        },
      ],
      handler: findByUserID,
      auth: "jwt",
    },
  };
};
