"use strict";

module.exports = (server) => {
  const {
    controllers: {
        user: { 
          findID
         },
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
        }
      ],
      handler: findID,
      auth: "jwt",
    },
    
  };
};