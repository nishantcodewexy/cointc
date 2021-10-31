"use strict";

module.exports = (server) => {
  const Schema = require("../../../schema/wallet.schema");
  const { payload: payloadSchema } = Schema.create(server);
  const {
    controllers: {
      wallet: { create },
    },
    helpers: {
      permissions: { isUser },
    },
  } = server.app;

  return {
    method: "POST",
    path: "/wallet",
    config: {
      pre: [
        {
          method: isUser,
          assign: "user",
        },
      ],
      handler: create,
      auth: "jwt",
      validate: {
        payload: payloadSchema,
      },
    },
  };
};
