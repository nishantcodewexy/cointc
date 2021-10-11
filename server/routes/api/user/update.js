"use strict";
const Joi = require("joi")
module.exports = (server) => {
  const {
    controllers: {
      user: { 
        update
       },
    },
    consts: { 
      roles: _roles
     },
    helpers:{
      permissions:{
        isAdmin
      }
    }
  } = server.app;

  const schema = Joi.object({
    data: Joi.array().items(
      Joi.object({
        kyc: Joi.object({
          email: Joi.bool(),
          payment_methods: Joi.object({
            we_chat: Joi.any(),
          }),
          sms: Joi.string(),
          id: Joi.string(),
          account_no: Joi.string(),
          bank_name: Joi.string(),
          IFSC_code: Joi.string(),
          country: Joi.string(),
          currency: Joi.string(),
        }),
      })
    ),
  });


  return {
    method: ["PUT","PATCH"],
    path: "/users/{id}",
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
