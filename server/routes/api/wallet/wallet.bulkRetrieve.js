"use strict";
const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      wallet: { bulkRetrieve },
    },
    helpers: {
      permissions:{
        isUser
      }
    },
  } = server.app;

  

  return {
    method: "GET",
    path: "/wallet",
    config: {
      pre: [
        {
          method: isUser,
          assign: "user",
        },
      ],
      handler: bulkRetrieve,
      auth: "jwt",
    },
  };
};
