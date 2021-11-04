"use strict";

module.exports = (server) => {
  const {
    controllers: {
      support_ticket: { find },
    },
    helpers: {
      permissions: {
        isUser
      },
    },
  } = server.app;

  return {
    method: "GET",
    path: "/ticket",
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
