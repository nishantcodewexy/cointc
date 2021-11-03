"use strict";

module.exports = (server) => {
  const Schema = require("../../../schema/bankdetail.schema");
  const { params: paramsSchema, payload: payloadSchema } = Schema?.remove(
    server
  );
  const {
    controllers: {
      bankdetail: { removeByID },
    },
    helpers: {
      permissions: { isUser },
    },
  } = server.app;

  return {
    method: "DELETE",
    path: "/bank-detail/{id}",
    config: {
      pre: [
        {
          method: isUser,
          assign: "user",
        },
      ],
      handler: removeByID,
      auth: "jwt",
      validate: {
        params: paramsSchema,
        payload: payloadSchema,
      },
    },
  };
};
