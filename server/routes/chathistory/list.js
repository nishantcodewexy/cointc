"use strict";

module.exports = (server) => {
  const {
    controllers: {
        chathistory: { list },
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
    path: "/chat-history",
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
        },
        
      ],
      handler: list,
      auth: "jwt",
    },
    
  };
};
