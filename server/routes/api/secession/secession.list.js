"use strict";

module.exports = (server) => {
  const {
    controllers: {
      secession: { getAll },
    },
    consts: { roles: _roles },
    helpers: {
      permissions: { isUser },
    },
  } = server.app;

  return {
    method: "GET",
    path: "/account/u/secessions",
    config: {
      pre: [
        {
          method: isUser,
          assign: "user",
        },
      ],
      handler: getAll,
      auth: "jwt",
    },
  };
};
