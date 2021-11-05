"use strict";

module.exports = (server) => {
  const Schema = require("../../../schema/order.schema");
  const { params: paramsSchema } = Schema.find(server);
  const {
    controllers: {
      order: { findByID },
    },
    helpers: {
      permissions: { isUser },
    },
  } = server.app;

  return {
    method: "GET",
    path: "/order/{id}",
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
