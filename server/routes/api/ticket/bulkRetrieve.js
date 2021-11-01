"use strict";

module.exports = (server) => {
  const {
    controllers: {
      support_ticket: { bulkRetrieve },
    },
    helpers: {
      permissions: {
        isAdminOrError
      },
    },
  } = server.app;

  return {
    method: "GET",
    path: "/ticket/bulk",
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
