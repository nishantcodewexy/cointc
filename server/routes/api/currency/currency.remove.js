"use strict";

module.exports = (server) => {
  const Schema = require("../../../schema/currency.schema");
  const { payload: payloadSchema } = Schema.bulkRemove(server);

  const {
    controllers: {
      currency: { remove },
    },
    helpers: {
      permissions: { isAdminOrError },
    },
  } = server.app;

  return {
    method: "DELETE",
    path: "/currency",
    config: {
      response: {
        emptyStatusCode: 204
      },
      pre: [
        [
          {
            method: isAdminOrError,
            assign: "user",
          },
        ],
      ],
      handler: remove,
      auth: "jwt",
      validate: {
        payload: payloadSchema,
      },
    },
  };
};
