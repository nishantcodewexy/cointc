"use strict";

module.exports = (server) => {
  const {
    controllers: {
      referral: { retrieve },
    },
   
    helpers:{
      permissions:{
        isUser,
      }
    }
  } = server.app;

  return {
    method: "GET",
    path: "/referral/{id}",
    config: {
      pre: [
        {
          method:isUser,
          assign: "user",
        },
      ],
      handler: retrieve,
      auth: "jwt",
    },
    
  };
};
