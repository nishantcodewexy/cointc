const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      profile: { find },
    },
    helpers: {
      permissions: { isUser },
    },
  } = server.app;

  return {
    method: "GET",
    path: "/profile",
    config: {
      pre: [
        {
          method: isUser,
          assign: "user",
        },
      ],
      handler: find,
      auth: "jwt",
    },
  };
};
