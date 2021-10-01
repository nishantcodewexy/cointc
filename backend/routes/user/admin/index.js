"use strict";

module.exports = (server) => {
  const {
    controllers: {
      user: { profile },
    },
    helpers: {
      jwt: { decodeUser },
    },
    consts: { roles: _roles },
  } = server.app;

  return {
    method: ["GET"],
    path: "/user/admin/profile",
    config: {
      pre: [
        [
          {
            method: decodeUser,
            assign: "user",
          },
          {
            method: () => _roles.admin,
            assign: "role",
          },
        ],
      ],
      handler: profile,
      auth: "jwt",
    },
  };
};
