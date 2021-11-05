"use strict";

module.exports = (server) => {
  const Schema = require("../../../schema/advert.schema");
  const { params: paramsSchema, payload: payloadSchema } = Schema.update(
    server
  );
  const {
    controllers: {
      advert: { updateByID },
    },
    helpers: {
      permissions: { isAdminOrError },
    },
  } = server.app;

  return {
    method: "PUT",
    path: "/ad/{id}",
    config: {
      pre: [{ method: isAdminOrError, assign: "user" }],
      handler: updateByID,
      auth: "jwt",
      validate: {
        params: paramsSchema,
        payload: payloadSchema,
      },
    },
  };
};
