"use strict";

module.exports = (server) => {
  const {
    controllers: {
      security: { remove },
    },
    helpers: {
      permissions: { isUser },
    },
  } = server.app;

  return {
    method: ["DELETE"],
    path: "/security",
    config: {
      pre: [
        {
          method: isUser,
          assign: "user",
        },
      ],
      handler: remove,
      auth: "jwt",
    },
  };
};
