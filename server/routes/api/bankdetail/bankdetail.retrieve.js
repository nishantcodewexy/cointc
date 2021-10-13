"use strict";

module.exports = (server) => {
  const {
    controllers: {
        bankdetail: { retrieve },
    },
    consts: { roles: _roles },
    helpers:{
      permissions:{
        isUser
      }
    }
  } = server.app;

  return {
    method: "GET",
    path: "/bank-details/{id}",
    config: {
      pre: [
        {
          method: (req) =>{
            
            return _roles.admin
          },
          assign: "role",
        },
        {
          method:isUser,
          assign: "user",
        },
      ],
      handler: retrieve,
      auth: "jwt",
    },
    
  };
};
