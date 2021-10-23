"use strict";

module.exports = (server) => {
  const Schema = require("../../_schema/currency.schema");
  const { params: paramsSchema } = Schema.restore(
    server
  );

  const {
    controllers: {
      currency: { restore },
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
      handler: restore,
      auth: "jwt",
      validate: {
        params: paramsSchema,
      },
    },
  };
};
