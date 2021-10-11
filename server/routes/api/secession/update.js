"use strict";
const Joi = require("joi")
module.exports = (server) => {
  const {
    controllers: {
      secession: { update },
    },
    consts: { roles: _roles },
    helpers:{
      permissions:{
        isAdmin
      }
    }
  } = server.app;

  const schema = Joi.object({
      level:Joi.number().greater(0),
      status:Joi.string().valid("pending","accept","deny"),
  })


  return {
    method: ["PUT","PATCH"],
    path: "/account/u/secessions/{id}",
    config: {
      pre: [
        {
          method: (req) =>{
            
            return _roles.admin
          },
          assign: "role",
        },
        {
          method:isAdmin,
          assign: "isAdmin",
        },
      ],
      handler: update,
      auth: "jwt",
      validate:{
          payload:schema
      }
    },
    
  };
};
