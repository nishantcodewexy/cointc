"use strict";

module.exports = (server) => {
  const {
    controllers: {
      user: {
        group: { list },
      },
    },
    db: { User },
    consts: { roles: _roles },
    helpers: {
      permissions: {
        isAdminOrError,
      },
    },
  } = server.app;

  return {
    method: "GET",
    path: "/users",
    config: {
      pre: [
        {
          method: isAdminOrError,
          assign: "admin",
        }

      ],
      handler: list,
      auth: "jwt",
    },
  };
};
