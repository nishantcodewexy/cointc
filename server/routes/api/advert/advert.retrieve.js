"use strict";

module.exports = (server) => {
  const Schema = require("../../../schema/advert.schema");
  const { params: paramsSchema } = Schema.retrieve(server);
  const {
    controllers: {
      advert: { retrieve },
    },
  } = server.app;

  return {
    method: "GET",
    path: "/ad/{id}",
    config: {
      handler: retrieve,
      auth: "jwt",
      validate: {
        params: paramsSchema,
      },
    },
  };
};
