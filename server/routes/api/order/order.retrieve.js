"use strict";

module.exports = (server) => {
  const Schema = require("../../../schema/order.schema");
  const { params: paramsSchema } = Schema.retrieve(server);
  const {
    controllers: {
      order: { retrieve },
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
      handler: retrieve,
      auth: "jwt",
      validate: {
        params: paramsSchema,
      },
    },
  };
};
