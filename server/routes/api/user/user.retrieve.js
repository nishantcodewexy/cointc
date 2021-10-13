"use strict";

module.exports = (server) => {
  const {
    controllers: {
      user: { findID },
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
      // pre: [
      //   {
      //     method: isUser,
      //     assign: "user",
      //   },
      // ],
      handler: findID,
      auth: "jwt",
    },
  };
};
