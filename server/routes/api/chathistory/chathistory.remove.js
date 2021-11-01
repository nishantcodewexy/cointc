"use strict";

module.exports = (server) => {
  const {
    controllers: {
      chathistory: { remove },
    },
    helpers: {
      permissions: { isUser },
    },
  } = server.app;

  return {
    method: "DELETE",
    path: "/chat-history/{id}",
    config: {
      pre: [
        [
          {
            method: isUser,
            assign: "user",
          },
        ],
      ],
      handler: remove,
      auth: "jwt",
    },
  };
};
