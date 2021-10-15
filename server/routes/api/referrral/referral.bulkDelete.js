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
        isAdminOrError
      }
    }
  } = server.app;

  const schema = Joi.object({
    data:Joi.array().items({
      UserId:Joi.string().uuid().required(),
      referrerId:Joi.string().uuid().required()
    }),
    force:Joi.boolean().default(false).optional()
  })

  return {
    method: "DELETE",
    path: "/referrals",
    config: {
      pre: [
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
