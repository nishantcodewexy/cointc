"use strict";
const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      advert: { create },
    },
    helpers: {
      jwt: { decodeUser },
    },
    consts: { patterns },
  } = server.app;

  const schema = Joi.object({
    price: Joi.string().required(),
    userId: Joi.string().required(),
    min_order: Joi.number().required(),
    max_order: Joi.number().required(),
    payment_method: Joi.string().required(),
    terms_of_trade: Joi.string().optional(),
    kind: Joi.string().pattern(patterns.ads_kind).required(),
    ttl: Joi.number().optional(),
    asset_pair: Joi.string().required(),
  });
  return {
    method: "POST",
    path: "/adverts",
    config: {
      pre: [
        {
          method: decodeUser,
          assign: "user",
        },
      ],
      handler: create,
      validate: {
        payload: schema,
      },
      auth: "jwt",
    },
  };
};
