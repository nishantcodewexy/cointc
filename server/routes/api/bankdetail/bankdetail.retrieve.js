"use strict";

module.exports = (server) => {
  const {
    controllers: {
        bankdetail: { retrieve },
    },
    consts: { roles: _roles },
    helpers:{
      permissions:{
        isUser,
        isAdminOrError
      }
    }
  } = server.app;

  return {
    method: "GET",
    path: "/bank-details/{id}",
    config: {
      pre: [
        
        {
          method:isUser,
          assign: "user",
        },
        {
          method:isAdminOrError,
          assign: "isAdmin",
        },
      ],
      handler: retrieve,
      auth: "jwt",
    },
    
  };
};
