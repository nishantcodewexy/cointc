"use strict";

module.exports = (server) => {
  const {
    controllers: {
      bankdetail: { retrieve },
    },
    helpers: {
      permissions: { isUser },
    },
  } = server.app;

  return {
    method: "GET",
    path: "/bank-detail/{id}",
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
