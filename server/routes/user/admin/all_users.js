"use strict";

module.exports = (server) => {
  const {
    controllers: {
      user: { getAllUser },
    },
    consts: { roles: _roles },
    helpers:{
      permissions:{
        isAdmin
      }
    }
  } = server.app;

  return {
    method: ["GET"],
    path: "/admin/users",
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
      handler: getAllUser,
      auth: "jwt",
    },
    
  };
};
