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
        {
          method: isAdmin,
          assign: "admin",
        }

      ],
      handler: async (req)=>({}),
      auth: "jwt",
    },
  };
};
