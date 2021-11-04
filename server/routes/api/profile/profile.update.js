const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      profile: { update },
    },
    helpers: {
      permissions: { isUser },
    },
  } = server.app;

  return {
    method: "PUT",
    path: "/profile",
    config: {
      pre: [
        {
          method: isUser,
          assign: "user",
        },
      ],
      handler: update,
      auth: "jwt",
    },
  };
};
