"use strict";

module.exports = (server) => {
  const {
    controllers: {
      chathistory: { retrieve },
    },
    helpers: {
      permissions: { isUser },
    },
  } = server.app;

  return {
    method: "GET",
    path: "/chat-history/{id}",
    config: {
      pre: [
        {
          method: isUser,
          assign: "user",
        },
      ],
      handler: retrieve,
      auth: "jwt",
    },
  };
};
