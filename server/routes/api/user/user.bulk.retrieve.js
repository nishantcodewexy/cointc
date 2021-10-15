"use strict";

module.exports = (server) => {
  const {
    controllers: {
      user: { bulkRetrieve },
    },
    consts: { roles: _roles },
    helpers: {
      permissions: { isAdminOrError },
    },
  } = server.app;

  return {
    method: "GET",
    path: "/users",
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
