"use strict";

module.exports = (server) => {
  const {
    controllers: {
      user: { getAllUser },
    },
    consts: { roles: _roles },
  } = server.app;

  return {
    method: ["GET"],
    path: "/admin/users",
    config: {
      pre: [
        {
          method: () => _roles.admin,
          assign: "role",
        },
      ],
      handler: getAllUser,
    },
  };
};
