"use strict";
const Joi = require("joi")
module.exports = (server) => {
  const {
    controllers: {
      user: { 
        update
       },
    },
    consts: { 
      roles: _roles
     },
    helpers:{
      permissions:{
        isAdmin
      }
    }
  } = server.app;


  

  


  return {
    method: ["PUT","PATCH"],
    path: "/users/{id}",
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
      handler: update,
      auth: "jwt",
      
    },
    
  };
};
