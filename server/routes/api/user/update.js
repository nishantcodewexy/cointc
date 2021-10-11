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
        isAdmin,
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
    path: "/users/{id}",
    config: {
      pre: [
        {
          method: (req) =>{
            
            return _roles.admin
          },
          assign: "role",
        },
        // {
        //   method:isAdmin,
        //   assign: "isAdmin",
        // },
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
