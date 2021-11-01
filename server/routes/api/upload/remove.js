"use strict";

module.exports = (server) => {
  const {
    controllers: {
      upload: { remove },
    },
    helpers: {
      permissions: { isUser },
    },
  } = server.app;

  return {
    method: "DELETE",
    path: "/upload/{id}",
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
