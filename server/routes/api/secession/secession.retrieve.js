"use strict";

module.exports = (server) => {
  const {
    controllers: {
      secession: { retrieve },
    },
    helpers: {
      permissions: { isUser },
    },
  } = server.app;

  return {
    method: "GET",
    path: "/secession/{id}",
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
