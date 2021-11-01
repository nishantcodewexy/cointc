"use strict";

module.exports = (server) => {
  const Schema = require("../../../schema/currency.schema");
  const { payload: payloadSchema } = Schema.bulkRestore(server);

  const {
    controllers: {
      currency: { bulkRestore },
    },
    helpers: {
      permissions: { isAdminOrError },
    },
  } = server.app;

  return {
    method: "PATCH",
    path: "/currency",
    config: {
      pre: [
        [
          {
            method: isAdminOrError,
            assign: "user",
          },
        ],
      ],
      handler: bulkRestore,
      auth: "jwt",
      validate: {
        payload: payloadSchema,
      },
    },
  };
};
