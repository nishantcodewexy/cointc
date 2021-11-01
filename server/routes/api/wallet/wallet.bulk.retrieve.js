"use strict";

module.exports = (server) => {
  const {
    controllers: {
      wallet: { bulkRetrieve },
    },
    helpers: {
      permissions: { isAdminOrError },
    },
  } = server.app;

  return {
    method: "GET",
    path: "/wallet/bulk",
    config: {
      pre: [
        {
          method: isAdminOrError,
          assign: "user",
        },
      ],
      handler: bulkRetrieve,
      auth: "jwt",
    },
  };
};
