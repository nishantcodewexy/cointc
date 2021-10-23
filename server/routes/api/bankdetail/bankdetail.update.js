"use strict";

module.exports = (server) => {
  const Schema = require("../../../schema/bankdetail.schema");
  const { params: paramsSchema, payload: payloadSchema } = Schema?.update(
    server
  );

  const {
    controllers: {
      bankdetail: { update },
    },
    helpers: {
      permissions: { isUser },
    },
  } = server.app;

  return {
    method: "PUT",
    path: "/bank-details/{id}",
    config: {
      pre: [
        {
          method: isUser,
          assign: "user",
        },
      ],
      handler: update,
      auth: "jwt",
      validate: {
        params: paramsSchema,
        payload: payloadSchema,
      },
    },
  };
};
