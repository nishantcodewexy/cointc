"use strict";

module.exports = (server) => {
  const {
    controllers: {
        bankdetail: { bulkRetrieve },
    },
    helpers:{
      permissions:{
        isAdminOrError,
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
      ],
      handler: bulkRetrieve,
      auth: "jwt",
    },
    
  };
};
