"use strict";

module.exports = (server) => {
  const Schema = require("../../../schema/bankdetail.schema");
  const { params: paramsSchema, payload: payloadSchema } = Schema?.update(
    server
  );

  const {
    controllers: {
      bankdetail: { updateByID },
    },
    helpers: {
      permissions: { isUser },
    },
  } = server.app;

  return {
    method: "PUT",
    path: "/bank-detail/{id}",
    config: {
      pre: [
        {
          method: isUser,
          assign: "user",
        },
      ],
      handler: updateByID,
      auth: "jwt",
      validate: {
        params: paramsSchema,
        payload: payloadSchema,
      },
    },
  };
};
