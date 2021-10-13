"use strict";
const Joi = require("joi")
module.exports = (server) => {
  const {
    controllers: {
      currency: { 
        group:{
          destroy
        }
       }
    },
    consts: { roles: _roles },
    helpers:{
      permissions:{
        isAdminOrError
      }
    }
  } = server.app;

  const schema = Joi.object({
    data:Joi.array().items(Joi.string().uuid()),
    force:Joi.boolean().default(false).optional()
  })

  return {
    method: "DELETE",
    path: "/currency",
    config: {
      pre: [
        [
          
          {
            method:isAdminOrError,
            assign: "user",
          },

        ]
      ],
      handler: destroy,
      auth: "jwt",
      validate:{
          payload:schema
      }
    },
    
  };
};
