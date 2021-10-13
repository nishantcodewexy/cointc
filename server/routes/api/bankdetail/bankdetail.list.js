"use strict";

module.exports = (server) => {
  const {
    controllers: {
        bankdetail: { list },
    },
    helpers:{
      permissions:{
        isAdmin,
      }
    }
  } = server.app;

  return {
    method: "GET",
    path: "/bank-details",
    config: {
      pre: [
        {
          method:isAdmin,
          assign: "user",
        },
      ],
      handler: list,
      auth: "jwt",
    },
    
  };
};
