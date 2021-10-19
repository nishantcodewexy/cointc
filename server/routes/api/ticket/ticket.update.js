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
        TicketSubjectType,
        TicketStatusType
      }
     },
    helpers:{
      permissions:{
        isAdminOrError
      }
    }
  } = server.app;

  const schema = Joi.object({
    
    subject:Joi.string().valid(...Object.keys(TicketSubjectType)),
    status:Joi.string().valid(...Object.keys(TicketStatusType)),
    
})


  return {
    method: ["PUT","PATCH"],
    path: "/tickets/{id}",
    config: {
      pre: [
        {
          method:isAdminOrError,
          assign: "isAdminOrError",
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
