"use strict";
const Joi = require("joi")
module.exports = (server) => {
  const {
    controllers: {
      bankdetail: { create },
    },
    consts: { 
      roles: _roles,
      types: {
        banks,
        country,
        currencies
      }
    },
    helpers:{
      permissions:{
        isUser
      }
    }
  } = server.app;

  const schema = Joi.object({
      account_no:Joi.string().length(8).required(),
      bank_name:Joi.string().valid(...Object.keys(banks)).required(),
      ifsc_code:Joi.string().length(10).required(),
      country:Joi.string().valid(...Object.keys(country)).required(),
      currency:Joi.string().valid(...Object.keys(currencies)).required()
  })


  return {
    method: "POST",
    path: "/bank-details",
    config: {
      pre: [
        {
          method:isUser,
          assign: "user",
        },
      ],
      handler: create,
      auth: "jwt",
      validate:{
          payload:schema
      }
    },
    
  };
};
