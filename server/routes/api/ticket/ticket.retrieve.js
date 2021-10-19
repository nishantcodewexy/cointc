"use strict";

module.exports = (server) => {
  const {
    controllers: {
        ticket: { retrieve },
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
    path: "/tickets/{id}",
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
