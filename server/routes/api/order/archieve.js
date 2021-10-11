"use strict";

const Joi = require("joi");


module.exports = (server) => {
  const {
    controllers: {
      order: { archive },
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
    path: "/account/u/order/{id}/archive",
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
      handler: archive,
      auth: "jwt",
  
    },
  };
};
