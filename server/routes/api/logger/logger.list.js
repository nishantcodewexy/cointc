"use strict";

module.exports = (server) => {
  const {
    controllers: {
        logger: { list },
    },
    helpers:{
      permissions:{
        isAdminOrError
      },
      
    }
  } = server.app;

  return {
    method: "GET",
    path: "/logs",
    config: {
      pre: [
        
        {
          method:isAdminOrError,
          assign: "isAdmin",
        },
      ],
      handler: list,
      auth: "jwt",
    },
    
  };
};
