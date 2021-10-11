"use strict";

const Joi = require("joi")

module.exports = (server) => {
  const {
    controllers: {
      referral: { create },
    },
    consts: { roles: _roles },
    helpers:{
      permissions:{
        isAdmin
      }
    }
  } = server.app;

  const schema = Joi.object({
      referral_code:Joi.string().length(10).required()
  })

  return {
    method: "POST",
    path: "/account/referral",
    config: {
      pre: [
        [{
          method: (req) =>{
            
            return _roles.admin
          },
          assign: "role",
        }],
        [{
          method:isAdmin,
          assign: "isAdmin",
        }],
      ],
      handler: create,
      auth: "jwt",
      validate:{
          payload:schema
      }
    },
    
  };
};
