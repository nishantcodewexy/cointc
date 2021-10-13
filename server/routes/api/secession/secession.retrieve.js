"use strict";

module.exports = (server) => {
  const {
    controllers: {
        secession: { get },
    },
    consts: { roles: _roles },
    helpers:{
      permissions:{
         isUser
      }
    }
  } = server.app;

  return {
    method: "GET",
    path: "/account/u/secessions/{id}",
    config: {
      pre: [
     
        {
          method:isUser,
          assign: "user",
        },
      ],
      handler: get,
      auth: "jwt",
    },
    
  };
};
