"use strict";
const Joi = require("joi")
module.exports = (server) => {
  const {
    controllers: {
      ticket: { update },
    },
    consts: { 
      roles: _roles,
      types:{
        banks,
        country,
        currencies
      }
     },
    helpers:{
      permissions:{
        isAdmin
      }
    }
  } = server.app;

  const schema = Joi.object({
    account_no:Joi.string().length(8),
    bank_name:Joi.string().valid(...Object.keys(banks)),
    ifsc_code:Joi.string().length(10),
    country:Joi.string().valid(...Object.keys(country)),
    currency:Joi.string().valid(...Object.keys(currencies))
})


  return {
    method: ["PUT","PATCH"],
    path: "/tickets/{id}",
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
