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
        isAdmin
      }
    }
  } = server.app;

  
  
  return {
    method: "DELETE",
    path: "/account/group/trade/{id}",
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
      handler: destroy,
      auth: "jwt",
  
    },
  };
};
