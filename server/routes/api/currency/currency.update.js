"use strict";

module.exports = (server) => {
  const Schema = require("../../../schema/currency.schema");
  const { payload: payloadSchema, params: paramsSchema} = Schema.update(server);

  const {
    controllers: {
      currency: { update },
    },
    helpers: {
      permissions: { isAdminOrError },
    },
  } = server.app;

  return {
    method: "PUT",
    path: "/currency/{id}",
    config: {
      pre: [
        [
          {
            method: isAdminOrError,
            assign: "user",
          },
        ],
      ],
      handler: update,
      auth: "jwt",
      validate: {
        payload: payloadSchema,
        params: paramsSchema
      },
    },
  };
};
