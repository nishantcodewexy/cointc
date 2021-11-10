"use strict";

module.exports = (server) => {
  const Schema = require("../../../schema/bankdetail.schema");
  const { payload: payloadSchema } = Schema?.create(server);

  const {
    controllers: {
      bankdetail: { create },
    },
    helpers: {
      permissions: { isUser },
    },
  } = server.app;

  return {
    method: "POST",
    path: "/bank-detail",
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
