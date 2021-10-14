"use strict";

module.exports = (server) => {
  const {
    controllers: {
        bankdetail: { list },
    },
    helpers:{
      permissions:{
        isUser,
        isAdminOrError
      }
    }
  } = server.app;

  return {
    method: "GET",
    path: "/bank-details",
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
      handler: list,
      auth: "jwt",
    },
    
  };
};
