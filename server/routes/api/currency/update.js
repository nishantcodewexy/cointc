"use strict";
const Joi = require("joi")

module.exports = (server) => {
  const {
    controllers: {
      currency: { 
        group:{
            update
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
    id:Joi.string().uuid().required(),
    type:Joi.string().required(),
    iso_code:Joi.string().required(),
    name:Joi.string().required()
    })
  )


  return {
    method: ["PUT","PATCH"],
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
      handler: update,
      auth: "jwt",
      validate:{
        payload:schema
      }
      
    },
    
  };
};
