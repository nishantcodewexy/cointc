const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      address: { find },
    },
    helpers: {
      permissions: { isUser },
    },
  } = server.app;

  return {
    method: "GET",
    path: "/address",
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
