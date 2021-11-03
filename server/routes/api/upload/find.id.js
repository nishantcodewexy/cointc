"use strict";

module.exports = (server) => {
  const {
    controllers: {
      upload: { findByID },
    },
    helpers: {
      permissions: { isUser },
    },
  } = server.app;

  return {
    method: "GET",
    path: "/upload/{id}",
    config: {
      pre: [
        {
          method: isUser,
          assign: "user",
        },
      ],
      handler: findByID,
      auth: "jwt",
    },
  };
};
