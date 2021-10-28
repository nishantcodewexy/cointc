"use strict";

module.exports = (server) => {
  const Schema = require('../../../schema/wallet.schema');
  const { params: paramsSchema } = Schema.retrieve(server)
  const {
    controllers: {
      wallet: { retrieve },
    },
    helpers: {
      permissions: { isUser },
    },
  } = server.app;


  return {
    method: "GET",
    path: "/wallet/{address}",
    config: {
      pre: [
        {
          method: isUser,
          assign: "user",
        },
      ],
      handler: retrieve,
      auth: "jwt",
      validate: {
        params: paramsSchema
      }
    },
  };
};
