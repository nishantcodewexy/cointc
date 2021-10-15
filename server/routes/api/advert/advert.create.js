"use strict";
const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      advert: { create },
    },
    helpers: {
      permissions:{
        isUser
      },
      handleValidation
    },
    consts: { patterns,types:{AdvertType} },
  } = server.app;

  const schema = Joi.object({
    min_order_quantity:Joi.number().integer().min(0).required(),
    max_order_quantity:Joi.number().integer().min(0).required(),
    min_order_price:Joi.number().integer().min(0).required(),
    max_order_price:Joi.number().integer().min(0).required(),
    payment_methods: Joi.object().required(),
    advert_type: Joi.string().valid(...Object.values(AdvertType)).required(),
    payment_time_limit:Joi.number().integer().default(-1).optional(),
    price:Joi.number().required(),
    floating_price:Joi.number().integer().required(),
    asset_quantity:Joi.number().required(),
    fiat_currency:Joi.string().required(),
    asset_type:Joi.number(),
    remarks:Joi.string().optional(),
    auto_reply:Joi.string().optional(),
    trade_conditions:Joi.string(),
    published:Joi.boolean().default(false).optional()
    
    // min_order: Joi.number().required(),
    // max_order: Joi.number().required(),
    // terms_of_trade: Joi.string().optional(),
    // kind: Joi.string().pattern(patterns.ads_kind).required(),
    // ttl: Joi.number().optional(),
    // asset_pair: Joi.string().required(),
  });
  return {
    method: "POST",
    path: "/adverts",
    config: {
      pre: [
        {
          method: isUser,
          assign: "user",
        },
        {
          method: handleValidation(schema),
          assign: "data",
        },
      ],
      handler: create,
      auth: "jwt",
    },
  };
};
