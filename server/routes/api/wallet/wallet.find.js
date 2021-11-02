"use strict";

module.exports = (server) => {
  const {
    controllers: {
      wallet: { find },
    },
    helpers: {
      permissions: { isUser },
    },
  } = server.app;

  return {
    method: "GET",
    path: "/wallet",
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
