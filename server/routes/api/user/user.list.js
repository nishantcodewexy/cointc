"use strict";

module.exports = (server) => {
  const {
    controllers: {
      user: { list },
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
      // pre: [
      //   {
      //     method: isAdminOrError,
      //     assign: "user",
      //   },
      // ],
      handler: list,
      auth: "jwt",
    },
  };
};
