"use strict";

module.exports = (server) => {
  const {
    controllers: {
        upload: { list },
    },
    consts: { roles: _roles },
    helpers:{
      isAdmin
      
    }
  } = server.app;

  return {
    method: "GET",
    path: "/uploads",
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
