"use strict";

const Joi = require("joi");


module.exports = (server) => {
  const {
    controllers: {
      order: { bulkDestroy },
    },
    consts: { roles: _roles },
    helpers:{
      permissions:{
        isUser
      }
      
    }
  } = server.app;

  const schema = Joi.object({
      data:Joi.array().items(Joi.object({
          id:Joi.string().uuid()
      })),
      force:Joi.boolean().default(false).optional()
  })
  
  
  return {
    method: "DELETE",
    path: "/order",
    config: {
      pre: [
        
        {
          method:isUser,
          assign: "user",
        },
      ],
      handler: bulkDestroy,
      auth: "jwt",
      validate:{
          payload:schema
      }
      
  
    },
  };
};
