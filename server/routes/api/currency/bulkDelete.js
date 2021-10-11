"use strict";
const Joi = require("joi")
module.exports = (server) => {
  const {
    controllers: {
      upload: { bulkDelete }
    },
    consts: { roles: _roles },
    helpers:{
      permissions:{
        isAdmin
      }
    }
  } = server.app;

  const schema = Joi.array().items(Joi.string().uuid())

  return {
    method: "DELETE",
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
            method:isAdmin,
            assign: "isAdmin",
          },

        ]
      ],
      handler: bulkDelete,
      auth: "jwt",
      validate:{
          payload:schema
      }
    },
    
  };
};
