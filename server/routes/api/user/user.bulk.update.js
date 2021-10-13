"use strict";
const Joi = require("joi")
module.exports = (server) => {
  const {
    controllers: {
      user: { 
        group:{
            update
        }
       },
    },
    consts: { 
      roles: _roles,

     },
    helpers:{
      permissions:{
        isAdminOrError
      }
    }
  } = server.app;


  const schema = Joi.object({
      data:Joi.array().items(
          Joi.object({
              id:Joi.string().uuid(),
              mode:Joi.string().optional(),
              nickname:Joi.string().optional(),
              role:Joi.string().valid(...Object.keys(_roles)).optional()
          })
      ),
      suspend:Joi.boolean().optional()
  })
  

  


  return {
    method: ["PUT","PATCH"],
    path: "/users",
    config: {
      pre: [
        {
          method: (req) =>{
            
            return _roles.admin
          },
          assign: "role",
        },
        {
          method:isAdminOrError,
          assign: "isAdminOrError",
        }
      ],
      handler: update,
      auth: "jwt",
      validate:{
          payload:schema
      }
    },
    
  };
};
