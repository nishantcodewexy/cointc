"use strict";

module.exports = (server) => {
  const {
    controllers: {
      user: { remove },
    },
    consts: { roles: _roles },
    helpers:{
      permissions:{
        isAdmin
      }
    }
  } = server.app;

  return {
    method: "DELETE",
    path: "/users/{id}",
    config: {
      pre: [
        {
          method: (req) =>{
            
            return _roles.admin
          },
          assign: "role",
        },
        {
          method:isAdmin,
          assign: "isAdmin",
        },
      ],
      handler: remove,
      auth: "jwt",
    },
    
  };
};
