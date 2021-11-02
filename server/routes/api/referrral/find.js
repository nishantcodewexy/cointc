"use strict";

module.exports = (server) => {
  const {
    controllers: {
      referral: { find },
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
      handler: find,
      auth: "jwt",
    },
    
  };
};
