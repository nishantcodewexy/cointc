"use strict";

const Joi = require("joi");


module.exports = (server) => {
  const {
    controllers: {
      order: { create },
    },
    consts: { roles: _roles },
    helpers:{
      permissions:{
        isAdmin
      }
    }
  } = server.app;

  
  const schema = Joi.object({
    advert_id:Joi.string().guid({
        version: [
            'uuidv4',
            'uuidv5'
        ]
    }).required(),
    total_amount:Joi.number().required(),
    total_quantity:Joi.number().required(),
    appeal:Joi.string(),
    remark:Joi.string(),
    // status:Joi.string().valid(
    //     "unpaid",
    //     "paid",
    //     "released",
    //     "completed",
    //     "disputed",
    //     "canceled"
    // ).default("unpaid"),
    rating:Joi.number().min(1).max(5),
    trx_id:Joi.string().guid({
        version: [
            'uuidv4',
            'uuidv5'
        ]
    }).required()
  })
  
  return {
    method: "POST",
    path: "/order",
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
      handler: create,
      auth: "jwt",
      validate:{
          payload:schema
      }
    },
  };
};
