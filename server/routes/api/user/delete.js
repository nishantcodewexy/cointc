"use strict";
const Joi = require("joi")
module.exports = (server) => {
  const {
    controllers: {
      user: { remove }
    },
    consts: { roles: _roles },
    helpers:{
      permissions:{
        isAdmin
      }
    }
  } = server.app;

  const schema = Joi.object({
    soft:Joi.boolean().default(true).optional()
  })

  return {
    method: "DELETE",
    path: "/users/{id}",
    config: {
      pre: [
        {
          method:isAdmin,
          assign: "isAdmin",
        },
      ],
      handler: remove,
      auth: "jwt",
      validate:{
        payload:schema
      }
    },
    
  };
};
