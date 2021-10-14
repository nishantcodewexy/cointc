"use strict";

module.exports = (server) => {
  const {
    controllers: {
        ticket: { list },
    },
    consts: { roles: _roles },
    helpers:{
      permissions:{
        isUser
      },
      
    }
  } = server.app;

  return {
    method: "GET",
    path: "/tickets",
    config: {
      pre: [
        
        {
          method:isUser,
          assign: "user",
        },
      ],
      handler: list,
      auth: "jwt",
    },
    
  };
};
