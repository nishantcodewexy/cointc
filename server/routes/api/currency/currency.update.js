"use strict";

module.exports = (server) => {
  const Schema = require("../../../schema/currency.schema");
  const { payload: payloadSchema } = Schema.bulkUpdate(server);
  
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
      handler: update,
      auth: "jwt",
      validate: {
        payload: payloadSchema,
      },
    },
  };
};
