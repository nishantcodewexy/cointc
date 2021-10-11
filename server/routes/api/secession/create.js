"use strict";
const Joi = require("joi")
module.exports = (server) => {
  const {
    controllers: {
      secession: { create },
    },
    consts: { roles: _roles },
    helpers:{
      permissions:{
        isAdmin
      }
    }
  } = server.app;

  const schema = Joi.object({
      description:Joi.string(),
  })


  return {
    method: "POST",
    path: "/account/u/secessions",
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
      handler: create,
      auth: "jwt",
      validate:{
          payload:schema
      }
    },
    
  };
};
