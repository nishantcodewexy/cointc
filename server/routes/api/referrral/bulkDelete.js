"use strict";


const Joi = require("joi")

module.exports = (server) => {
  const {
    controllers: {
      referral: { bulkDestroy },
    },
    consts: { roles: _roles },
    helpers:{
      permissions:{
        isAdmin,
        isAdminOrError
      }
    }
  } = server.app;

  const schema = Joi.array().items({
    UserId:Joi.string().uuid().required(),
    referrerId:Joi.string().uuid().required()
  })

  return {
    method: "DELETE",
    path: "/referrals",
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
        {
          method:isAdminOrError,
          assign: "isAdminOrError",
        },
      ],
      handler: bulkDestroy,
      auth: "jwt",
      validate:{
        payload:schema
      }
    },
    
  };
};
