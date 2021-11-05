"use strict";

module.exports = (server) => {
  const Schema = require("../../../schema/currency.schema");
  const { params: paramsSchema } = Schema.restore(
    server
  );

  const {
    controllers: {
      currency: { restoreByID },
    },
    helpers: {
      permissions: { isAdminOrError },
    },
  } = server.app;

  return {
    method: "PATCH",
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
      handler: restoreByID,
      auth: "jwt",
      validate: {
        params: paramsSchema,
      },
    },
  };
};
