"use strict";

module.exports = (server) => {
  const Schema = require("../../../schema/advert.schema");
  const { params: paramsSchema } = Schema.retrieve(server);
  const {
    controllers: {
      advert: { updateByID },
    },
  } = server.app;

  return {
    method: "PUT",
    path: "/ad/{id}",
    config: {
      handler: updateByID,
      auth: "jwt",
      validate: {
        params: paramsSchema,
      },
    },
  };
};
