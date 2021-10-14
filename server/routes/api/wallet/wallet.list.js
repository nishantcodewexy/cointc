"use strict";
const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      wallet: { list },
    },
    helpers: {
      permissions:{
        isUser
      }
    },
  } = server.app;

  

  return {
    method: "GET",
    path: "/wallets",
    config: {
      pre: [
        {
          method: isUser,
          assign: "user",
        },
      ],
      handler: list,
      auth: "jwt",
    },
  };
};
