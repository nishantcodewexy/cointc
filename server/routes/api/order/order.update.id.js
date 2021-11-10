"use strict";

module.exports = (server) => {
  const Schema = require("../../../schema/order.schema");
  const { params: paramsSchema, payload: payloadSchema } = Schema.update(
    server
  );
  const {
    controllers: {
      order: { updateByID },
    },
    helpers: {
      permissions: { isUser },
    },
  } = server.app;

  return {
    method: "PUT",
    path: "/order/{id}",
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
