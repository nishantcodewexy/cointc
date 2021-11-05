"use strict";

module.exports = (server) => {
  const {
    controllers: {
      advert: { find },
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
      handler: find,
      auth: "jwt",
    },
  };
};
