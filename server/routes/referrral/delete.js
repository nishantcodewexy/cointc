"use strict";

module.exports = (server) => {
  const {
    controllers: {
      referral: { destroy },
    },
    consts: { roles: _roles },
    helpers:{
      permissions:{
        isAdmin
      }
    }
  } = server.app;

  return {
    method: "DELETE",
    path: "/account/referral/{id}",
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
      handler: destroy,
      auth: "jwt",
    },
    
  };
};
