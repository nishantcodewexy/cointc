"use strict";

module.exports = (server) => {
  const {
    controllers: {
        user: { 
          group:{
            list
          }
         },
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
    path: "/users",
    config: {
      pre: [
        // {
        //   method: (req) =>{
            
        //     return _roles.admin
        //   },
        //   assign: "role",
        // },
        // {
        //   method:isAdmin,
        //   assign: "isAdmin",
        // },
      ],
      handler: async (req)=>({}),
      auth: "jwt",
    },
    
  };
};
