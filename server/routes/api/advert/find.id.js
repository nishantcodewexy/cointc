"use strict";

module.exports = (server) => {
  const Schema = require("../../../schema/advert.schema");
  const { params: paramsSchema } = Schema.retrieve(server);
  const {
    controllers: {
      advert: { findByID },
    },
    helpers: {
      permissions: { isUser },
    },
  } = server.app;

  return {
    method: "GET",
    path: "/ad/{id}",
    config: {
      pre: [
        {
          method: isUser,
          assign: "user",
        },
      ],
      handler: findByID,
      auth: "jwt",
      validate: {
        params: paramsSchema,
      },
    },
  };
};
