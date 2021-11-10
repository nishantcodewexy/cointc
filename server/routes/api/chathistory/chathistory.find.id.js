"use strict";

module.exports = (server) => {
  const {
    controllers: {
      chathistory: { findByID },
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
      handler: findByID,
      auth: "jwt",
    },
  };
};
