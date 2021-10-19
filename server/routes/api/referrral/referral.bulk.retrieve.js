"use strict";

module.exports = (server) => {
  const {
    controllers: {
      referral: { bulkRetrieve },
    },
   
    helpers:{
      permissions:{
        isUser,
      }
    }
  } = server.app;

  return {
    method: "GET",
    path: "/referral",
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
