"use strict";

module.exports = (server) => {
  const {
    controllers: {
      order: { bulkRetrieve },
    },
    helpers: {
      permissions: { isUser },
    },
  } = server.app;

  return {
    method: "GET",
    path: "/order/bulk",
    config: {
      pre: [
        {
          method: isUser,
          assign: "user",
        },
      ],
      handler: bulkRetrieve,
      auth: "jwt",
    },
  };
};
