"use strict";

module.exports = (server) => {
  const {
    controllers: {
        currency: { list },
    },
    consts: { roles: _roles },
    helpers:{
      permissions:{
        isAdmin
      }
    }
  } = server.app;

  return {
    method: "GET",
    path: "/currency",
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
      handler: list,
      auth: "jwt",
    },
    
  };
};
