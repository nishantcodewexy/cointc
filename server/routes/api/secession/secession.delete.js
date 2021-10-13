"use strict";
const Joi = require("joi")
module.exports = (server) => {
  const {
    controllers: {
      secession: { delete_ }
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
    path: "/account/u/secessions/{id}",
    config: {
      pre: [
        {
          method:isUser,
          assign: "user",
        },
      ],
      handler: delete_,
      auth: "jwt"
    },
    
  };
};
