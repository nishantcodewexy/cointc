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
        isAdmin,
      },
    },
  } = server.app;

  return {
    method: "GET",
    path: "/users",
    config: {
      pre: [
        // ***This is not needed. You can get the user role
        // **from the Model
        /* {
          method: (req) => {
            return _roles.admin;
          },
          assign: "role",
        }, */

        {
          method: isAdmin,
          assign: "admin",
        },
      ],
      handler: list,
      auth: "jwt",
    },
  };
};
