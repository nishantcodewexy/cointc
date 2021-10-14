"use strict";
const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      wallet: { retrieve },
    },
    helpers: {
      permissions:{
        isUser
      }
    },
  } = server.app;

  const schema = Joi.object({
    address: Joi.string().required(),
  });

  return {
    method: ["GET"],
    path: "/wallets/{address}",
    config: {
      pre: [
        {
          method: isUser,
          assign: "user",
        },
      ],
      handler: retrieve,
      validate: {
        params: schema,
      },
      auth: "jwt",
    },
  };
};
