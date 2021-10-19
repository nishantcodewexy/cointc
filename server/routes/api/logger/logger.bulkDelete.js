"use strict";

module.exports = (server) => {
  const {
    controllers: {
        logger: { bulkDestroy },
    },
    consts: { roles: _roles },
    helpers:{
      permissions:{
        isAdminOrError
      },
      
    }
  } = server.app;

  return {
    method: "DELETE",
    path: "/logs",
    config: {
      pre: [
        
        {
          method:isAdminOrError,
          assign: "isAdmin",
        },
      ],
      handler: bulkDestroy,
      auth: "jwt",
    },
    
  };
};
