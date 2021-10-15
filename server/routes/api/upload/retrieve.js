"use strict";

module.exports = (server) => {
  const {
    controllers: {
        upload: { retrieve },
    },
    helpers:{
      permissions:{
        isUser
      }
      
    }
  } = server.app;

  return {
    method: "GET",
    path: "/uploads/{id}",
    config: {
      pre: [
        {
          method: isUser,
          assign: "user",
        }
      ],
      handler: retrieve,
      auth: "jwt",
    },
    
  };
};
