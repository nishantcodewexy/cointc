"use strict";
const Joi = require("joi");
const {types:{AssetType}} = require("../../../consts")
module.exports = (server) => {
  const {
    controllers: {
      wallet: { create },
    },
    helpers: {
      permissions:{
        isUser
      },
      handleValidation
    },
  } = server.app;

  const schema = Joi.object({
    currency:Joi.string().valid(...Object.values(AssetType)).required(),
  })

  return {
    method: "POST",
    path: "/wallets",
    config: {
      pre: [
        {
          method: isUser,
          assign: "user",
        },
        {
          method: handleValidation(schema),
          assign: "payload",
        },
      ],
      handler: create,
      auth: "jwt",
    },
  };
};
