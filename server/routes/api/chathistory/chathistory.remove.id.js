"use strict";

module.exports = (server) => {
  const {
    controllers: {
      chathistory: { removeByID },
    },
    helpers: {
      permissions: { isAdminOrError },
    },
  } = server.app;

  return {
    method: "DELETE",
    path: "/chat-history/{id}",
    config: {
      pre: [
        [
          {
            method: isAdminOrError,
            assign: "user",
          },
        ],
      ],
      handler: removeByID,
      auth: "jwt",
    },
  };
};
