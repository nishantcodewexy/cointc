"use strict";

module.exports = (server) => {
  const {
    controllers: {
        currency: { list },
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
    path: "/currency",
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
