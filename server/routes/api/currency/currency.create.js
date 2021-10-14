"use strict";
const Joi = require("joi")

module.exports = (server) => {
  const {
    controllers: {
      currency: { 
        create
        
       },
    },
    consts: { 
      roles: _roles,
      types:{
        country
      }
    },
    helpers:{
      permissions:{
         isAdminOrError,
         isUser
      }
    }
  } = server.app;

  const schema = Joi.array().items(
    Joi.object({
      "type":Joi.string().required(),
      "iso_code":Joi.string().required(),
      "name":Joi.string().required()
    })
  )


  return {
    method: "POST",
    path: "/currency",
    config: {
      pre: [      
        [
          
          {
            method:isAdminOrError,
            assign: "isAdmin",
          },
          {
            method:isUser,
            assign: "user",
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
