"use strict";
const Joi = require("joi")

module.exports = (server) => {
  const {
    controllers: {
      chathistory: { create },
    },
    consts: { 
      roles: _roles,
      types:{
        country
      }
    },
    helpers:{
      permissions:{
        isAdminOrError
      }
    }
  } = server.app;

  const schema = Joi.object({
      country:Joi.string().valid(...Object.keys(country)).required(),
      visitor_email:Joi.string().email().required()
  })


  return {
    method: "POST",
    path: "/chat-history",
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
      handler: create,
      auth: "jwt",
      validate:{
          payload:schema
      }
    },
    
  };
};
