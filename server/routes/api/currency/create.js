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
        isAdminOrError
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
