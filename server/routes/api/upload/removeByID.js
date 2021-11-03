"use strict";

module.exports = (server) => {
  const {
    controllers: {
      upload: { removeByID },
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
      handler: removeByID,
      auth: "jwt",
    },
  };
};
