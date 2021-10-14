"use strict";

const Joi = require("joi");


module.exports = (server) => {
  const {
    controllers: {
      order: { destroy },
    },
    consts: { roles: _roles },
    helpers:{
      permissions:{
        isUser
      }
      
    }
  } = server.app;

  
  
  return {
    method: "DELETE",
    path: "/order/{id}",
    config: {
      pre: [
        
        {
          method:isUser,
          assign: "user",
        },
      ],
      handler: destroy,
      auth: "jwt",
      
  
    },
  };
};
