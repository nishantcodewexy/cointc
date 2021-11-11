"use strict";

module.exports = (server) => {
  const {
    controllers: {
      affiliate: { find },
    },
    helpers: {
      permissions: { isUser },
    },
  } = server.app;

  return {
    method: "GET",
    path: "/affiliate",
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
