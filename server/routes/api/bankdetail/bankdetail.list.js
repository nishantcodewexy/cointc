"use strict";

module.exports = (server) => {
  const {
    controllers: {
        bankdetail: { list },
    },
    helpers:{
      permissions:{
        isUser,
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
      ],
      handler: list,
      auth: "jwt",
    },
    
  };
};
