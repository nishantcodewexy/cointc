"use strict";

module.exports = (server) => {
  const Schema = require("../../_schema/currency.schema");
  const { payload: payloadSchema } = Schema.bulkCreate(server);

  const {
    controllers: {
      currency: { bulkCreate },
    },
    helpers: {
      permissions: { isAdminOrError },
    },
  } = server.app;

  return {
    method: "POST",
    path: "/currency/bulk",
    config: {
      pre: [
        [
          {
            method: isAdminOrError,
            assign: "user",
          },
        ],
      ],
      handler: bulkCreate,
      auth: "jwt",
      validate: {
        payload: payloadSchema,
      },
    },
  };
};
