"use strict";

module.exports = (server) => {
  const {
    controllers: {
        bankdetail: { list },
    },
    consts: { roles: _roles },
    helpers:{
      permissions:{
        isAdmin,
        // isAdminOrError
      }
    }
  } = server.app;

  return {
    method: "GET",
    path: "/bank-details",
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
      handler: list,
      auth: "jwt",
    },
    
  };
};
