"use strict";
const Joi = require("joi")
module.exports = (server) => {
  const {
    controllers: {
      ticket: { create },
    },
    consts: { 
      roles: _roles,
    },
    helpers:{
      permissions:{
        isUser
      },
     handleValidation
    }
  } = server.app;

  const schema = Joi.object({
      description:Joi.string().required()
  })


  return {
    method: "POST",
    path: "/tickets",
    config: {
      pre: [
       
        {
          method:isUser,
          assign: "user",
        },
        {
          method:handleValidation(schema),
          assign: "data",
        },
      ],
      handler: create,
      auth: "jwt"
    },
    
  };
};
