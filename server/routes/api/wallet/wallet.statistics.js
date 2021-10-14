"use strict";
const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      wallet: { statistic },
    },
    helpers: {
      permissions:{
        isUser
      }
    },
  } = server.app;

  

  return {
    method: ["GET"],
    path: "/wallets/statistic",
    config: {
      pre: [
        {
          method: isUser,
          assign: "user",
        },
      ],
      handler: statistic,
      
      auth: "jwt",
    },
  };
};
