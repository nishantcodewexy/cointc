"use strict";

module.exports = (server) => {
  const Schema = require("../../_schema/currency.schema");
  const { payload: payloadSchema } = Schema.create(server);

  const {
    controllers: {
      currency: { create },
    },
    helpers: {
      permissions: { isAdminOrError },
    },
  } = server.app;

  return {
    method: "POST",
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
      handler: create,
      auth: "jwt",
      validate: {
        payload: payloadSchema,
      },
    },
  };
};
