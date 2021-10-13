"use strict";
const Joi = require("joi")
module.exports = (server) => {
  const {
    controllers: {
      chathistory: { destroy }
    },
    consts: { roles: _roles },
    helpers:{
      permissions:{
        isAdminOrError
      }
    }
  } = server.app;


  return {
    method: "DELETE",
    path: "/chat-history/{id}",
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
            method:isAdminOrError,
            assign: "isAdminOrError",
          },

        ]
      ],
      handler: destroy,
      auth: "jwt"
    },
    
  };
};
