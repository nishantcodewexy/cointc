"use strict";

module.exports = (server) => {
  const {
    controllers: {
        upload: { list },
    },
    helpers:{
      permissions:{
        isUser
      }
      
    }
  } = server.app;

  return {
    method: "GET",
    path: "/uploads",
    config: {
      pre: [
        {
          method:isUser,
          assign: "user",
        }
        
      ],
      handler: list,
      auth: "jwt",
    },
    
  };
};
