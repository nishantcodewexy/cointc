"use strict";

module.exports = (server) => {
  const {
    controllers: {
      user: { bulkRetrieve },
    },
    helpers: {
      permissions: { isAdminOrError },
    },
  } = server.app;

  return {
    method: "GET",
    path: "/user/bulk",
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
