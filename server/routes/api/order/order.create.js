"use strict";

const Joi = require("joi");
const {
  permissions:{
    isUser
  },
  handleValidation
} = require("../../../helpers")

module.exports = (server) => {
  const {
    controllers: {
      order: { create },
    },
    consts: { roles: _roles },
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
          method:isUser,
          assign: "user",
        },
        {
          method:handleValidation(schema),
          assign: "data",
        },
      ],
      handler: create,
      auth: "jwt",
    },
  };
};
