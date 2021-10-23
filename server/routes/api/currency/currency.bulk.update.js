"use strict";
const Joi = require("joi");

module.exports = (server) => {
  const Schema = require("../../../schema/currency.schema");
  const { payload: payloadSchema } = Schema.bulkUpdate(server);
  
  const {
    controllers: {
      currency: { bulkUpdate },
    },

    helpers: {
      permissions: { isAdminOrError },
    },
  } = server.app;

  return {
    method: "PUT",
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
      handler: bulkUpdate,
      auth: "jwt",
      validate: {
        payload: payloadSchema,
      },
    },
  };
};
