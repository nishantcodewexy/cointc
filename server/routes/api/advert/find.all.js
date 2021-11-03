"use strict";

module.exports = (server) => {
  const {
    controllers: {
      advert: { findAll },
    },
    helpers: {
      permissions: {
        isUser
      }
    }
  } = server.app;

  return {
    method: "GET",
    path: "/ad",
    config: {
      pre: [
        {
          method: isUser,
          assign: 'user'
        }
      ],
      handler: findAll,
      auth: "jwt",
    },
  };
};
