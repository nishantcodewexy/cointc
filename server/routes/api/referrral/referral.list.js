"use strict";

module.exports = (server) => {
  const {
    controllers: {
      referral: { list },
    },
    consts: { roles: _roles },
    helpers:{
      permissions:{
        isUser,
      }
    }
  } = server.app;

  return {
    method: "GET",
    path: "/referrals",
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
