"use strict";

module.exports = (server) => {
  const Schema = require("../../../schema/order.schema");
  const { params: paramsSchema, payload: payloadSchema } = Schema.remove(
    server
  );
  const {
    controllers: {
      order: { removeByID },
    },
    helpers: {
      permissions: { isAdminOrError },
    },
  } = server.app;

  return {
    method: "DELETE",
    path: "/order/{id}",
    config: {
      pre: [
        {
          method: isAdminOrError,
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
