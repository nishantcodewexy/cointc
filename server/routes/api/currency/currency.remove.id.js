"use strict";
module.exports = (server) => {
  const Schema = require("../../../schema/currency.schema");
  const {payload: payloadSchema, params: paramsSchema} = Schema.remove(server);

  const {
    controllers: {
      currency: { removeByID },
    },
    helpers: {
      permissions: { isAdminOrError },
    },
  } = server.app;

  return {
    method: "DELETE",
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
      handler: removeByID,
      auth: "jwt",
      validate: {
        payload: payloadSchema,
        params: paramsSchema,
      },
    },
  };
};
