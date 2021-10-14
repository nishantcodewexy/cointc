"use strict";

const {handleValidation} = require("../../../helpers")
const Joi = require("joi")
module.exports = (server) => {
  const {
    controllers: {
      order: { update },
    },
    consts: { roles: _roles },
    helpers:{
      permissions:{
        isUser
      }
      
    }
  } = server.app;

  const schema = Joi.object({
      appeal:Joi.string().optional(),
  })

  return {
    method: ["PUT","PATCH"],
    path: "/order/{id}",
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
      handler: update,
      auth: "jwt",
    },
    
  };
};
