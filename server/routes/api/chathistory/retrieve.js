"use strict";

module.exports = (server) => {
  const {
    controllers: {
        chathistory: { retrieve },
    },
    consts: { roles: _roles },
    helpers:{
      permissions:{
        isAdminOrError
      }
    }
  } = server.app;

  return {
    method: "GET",
    path: "/chat-history/{id}",
    config: {
      pre: [
        {
          method: (req) =>{
            
            return _roles.admin
          },
          assign: "role",
        },
        {
          method:isAdminOrError,
          assign: "isAdminOrError",
        }
      ],
      handler: retrieve,
      auth: "jwt",
    },
    
  };
};
