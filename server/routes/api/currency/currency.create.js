"use strict";
const Joi = require("joi")

module.exports = (server) => {
  const {
    controllers: {
      currency: { 
        group:{
          create
        }
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
