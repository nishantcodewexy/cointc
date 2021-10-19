"use strict";

module.exports = (server) => {
  const {
    controllers: {
        currency: { bulkRetrieve },
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
      handler: bulkRetrieve,
      auth: "jwt",
    },
    
  };
};
