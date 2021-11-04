"use strict";

module.exports = (server) => {
  const {
    controllers: {
      secession: { findByID },
    },
    helpers: {
      permissions: { isAdminOrError },
    },
  } = server.app;

  return {
    method: "GET",
    path: "/secession/{id}",
    config: {
      pre: [
        {
          method: isAdminOrError,
          assign: "user",
        },
      ],
      handler: findByID,
      auth: "jwt",
    },
  };
};
