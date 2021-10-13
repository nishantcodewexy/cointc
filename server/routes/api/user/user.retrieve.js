"use strict";

module.exports = (server) => {
  const {
    controllers: {
      user: { list },
    },
    consts: { roles: _roles },
    helpers: {
      permissions: { isUser },
    },
  } = server.app;

  return {
    method: "GET",
    path: "/users/{id}",
    config: {
      pre: [
        {
          method: isUser,
          assign: "user",
        },
      ],
      handler: list,
      auth: "jwt",
    },
  };
};
