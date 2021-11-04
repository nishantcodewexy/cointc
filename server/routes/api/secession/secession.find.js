"use strict";

module.exports = (server) => {
  const {
    controllers: {
      secession: { find },
    },
    helpers: {
      permissions: { isAdminOrError },
    },
  } = server.app;

  return {
    method: "GET",
    path: "/secession",
    config: {
      pre: [
        {
          method: isAdminOrError,
          assign: "user",
        },
      ],
      handler: find,
      auth: "jwt",
    },
  };
};
