"use strict";

module.exports = (server) => {
  const {
    controllers: {
        secession: { getAll },
    },
    consts: { roles: _roles },
    helpers:{
      permissions:{
        isAdmin
      }
    }
  } = server.app;

  return {
    method: "GET",
    path: "/account/u/secessions",
    config: {
      pre: [
        {
          method: (req) =>{
            
            return _roles.admin
          },
          assign: "role",
        },
        {
          method:isAdmin,
          assign: "isAdmin",
        },
      ],
      handler: getAll,
      auth: "jwt",
    },
    
  };
};
