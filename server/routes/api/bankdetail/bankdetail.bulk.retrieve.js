"use strict";

module.exports = (server) => {
  const {
    controllers: {
        bankdetail: { bulkRetrieve },
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
          method:isAdminOrError,
          assign: "user",
        },
        {
          method:isAdminOrError,
          assign: "isAdmin",
        },
      ],
      handler: bulkRetrieve,
      auth: "jwt",
    },
    
  };
};
