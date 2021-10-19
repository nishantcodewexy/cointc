"use strict";

module.exports = (server) => {
  const {
    controllers: {
        logger: { destroy },
    },
    helpers:{
      permissions:{
        isAdminOrError
      },
      
    }
  } = server.app;

  return {
    method: "DELETE",
    path: "/logs/{id}",
    config: {
      pre: [
        
        {
          method:isAdminOrError,
          assign: "isAdmin",
        },
      ],
      handler: destroy,
      auth: "jwt",
    },
    
  };
};
