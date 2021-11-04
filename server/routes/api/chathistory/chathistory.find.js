"use strict";

module.exports = (server) => {
  const {
    controllers: {
      chathistory: { find },
    },
    helpers: {
      permissions: { isAdminOrError },
    },
  } = server.app;

  return {
    method: "GET",
    path: "/chat-history",
    config: {
      pre: [
        {
          method: isAdminOrError,
          assign: "user",
        },
      ],
      handler: find,
      auth: "jwt",
    },
  };
};
