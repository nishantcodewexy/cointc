"use strict";

module.exports = (server) => {
  const {
    controllers: {
      user: { update },
    },
    consts: { roles: _roles },
    helpers:{
      permissions:{
        isAdmin
      }
    }
  } = server.app;

  return {
    method: ["PUT","PATCH"],
    path: "/users/{id}",
    config: {
      pre: [
        {
          method:isAdmin,
          assign: "isAdmin",
        },
      ],
      handler: update,
      auth: "jwt",
    },
    
  };
};
