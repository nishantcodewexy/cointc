"use strict";

module.exports = (server) => {
  const {
    controllers: {
      support_ticket: { findByID },
    },
    helpers: {
      permissions: { isUser },
    },
  } = server.app;

  return {
    method: "GET",
    path: "/ticket/{id}",
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
