const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      profile: { updateByUserID },
    },
    helpers: {
      permissions: { isAdminOrError },
    },
  } = server.app;

  return {
    method: "PUT",
    path: "/profile/:user_id",
    config: {
      pre: [
        {
          method: isAdminOrError,
          assign: "user",
        },
      ],
      handler: updateByUserID,
      auth: "jwt",
    },
  };
};
