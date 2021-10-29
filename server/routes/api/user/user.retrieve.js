"use strict";

module.exports = (server) => {
  const {
    controllers: {
      user: { retrieve },
    },
    helpers: {
      permissions: { isAdminOrError },
    },
  } = server.app;

  return {
    method: "GET",
    path: "/user/{id}",
    config: {
      pre: [
        {
          method: isAdminOrError,
          assign: "user",
        },
      ],
      handler: retrieve,
      auth: "jwt",
    },
  };
};
