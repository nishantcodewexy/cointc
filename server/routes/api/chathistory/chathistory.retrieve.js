"use strict";

module.exports = (server) => {
  const {
    controllers: {
      chathistory: { retrieve },
    },
    helpers: {
      permissions: { isAdminOrError },
    },
  } = server.app;

  return {
    method: "GET",
    path: "/chat-history/{id}",
    config: {
      pre: [
        {
          method: isAdminOrError,
          assign: "user",
        },
      ],
      handler: retrieve,
      auth: "jwt",
    },
  };
};
