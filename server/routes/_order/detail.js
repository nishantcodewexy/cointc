"use strict";

module.exports = (server) => {
  const {
    controllers: {
      order: { retrieve },
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
    path: "/order/{id}",
    config: {
      pre: [
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
