"use strict";
const Joi = require("joi")
module.exports = (server) => {
  const {
    controllers: {
      ticket: { destory }
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
    path: "/tickets/{id}",
    config: {
      pre: [
        {
          method:isAdminOrError,
          assign: "user",
        },
      ],
      handler: destory,
      auth: "jwt"
    },
    
  };
};
