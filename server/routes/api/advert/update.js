"use strict";

module.exports = (server) => {
  const Schema = require("../../../schema/advert.schema");
  const { payload: payloadSchema } = Schema.retrieve(server);
  const {
    controllers: {
      advert: { update },
    },
  } = server.app;

  return {
    method: "PUT",
    path: "/ad",
    config: {
      handler: update,
      auth: "jwt",
      validate: {
        payload: payloadSchema,
      },
    },
  };
};
