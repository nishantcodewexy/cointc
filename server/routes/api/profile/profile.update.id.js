const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      profile: { updateByID },
    },
    helpers: {
      permissions: { isAdminOrError },
    },
  } = server.app;

  return {
    method: "PUT",
    path: "/profile/:id",
    config: {
      pre: [
        {
          method: isAdminOrError,
          assign: "user",
        },
      ],
      handler: updateByID,
      auth: "jwt",
    },
  };
};
