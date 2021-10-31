"use strict";

module.exports = (server) => {
  const {
    controllers: {
      advert: { bulkRetrieve },
    },
    helpers: {
      permissions: {
        isUser
      }
    }
  } = server.app;

  return {
    method: "GET",
    path: "/ad/bulk",
    config: {
      pre: [
        {
          method: isUser,
          assign: 'user'
        }
      ],
      handler: bulkRetrieve,
      auth: "jwt",
    },
  };
};
