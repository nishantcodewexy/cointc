"use strict";

module.exports = (server) => {
  const {
    controllers: {
        upload: { retrieve },
    },
    consts: { roles: _roles },
    helpers:{
      isAdmin
      
    }
  } = server.app;

  return {
    method: "GET",
    path: "/uploads/{id}",
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
        }
      ],
      handler: retrieve,
      auth: "jwt",
    },
    
  };
};
