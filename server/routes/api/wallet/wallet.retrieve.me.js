"use strict";

module.exports = (server) => {
  const Schema = require("../../../schema/wallet.schema");
  const { params: paramsSchema } = Schema.retrieve(server);
  const {
    controllers: {
      wallet: { retrieveMe },
    },
    helpers: {
      permissions: { isUser },
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
      handler: retrieveMe,
      auth: "jwt",
    },
  };
};
