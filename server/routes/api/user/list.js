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
      jwt:{decodeUser},
      permissions: {
        isAdmin,
        // isAdminOrError
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
          method: (req) => {
            return User.findOne({
              where: {
                id: decodeUser(req),
              },
            });
          },
          assign: "user",
        },
        // {
        //   method: isAdmin,
        //   assign: "isAdmin",
        // },
      ],
      handler: list,
      auth: "jwt",
    },
  };
};
