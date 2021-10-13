"use strict";
const Joi = require("joi")
module.exports = (server) => {
  const {
    controllers: {
      upload: { delete_ }
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
    path: "/uploads/{id}",
    config: {
      pre: [
        {
          method: (req) =>{
            
            return _roles.admin
          },
          assign: "role",
        },
        [
          
          {
            method:isAdmin,
            assign: "isAdmin",
          },

        ]
      ],
      handler: delete_,
      auth: "jwt"
    },
    
  };
};
