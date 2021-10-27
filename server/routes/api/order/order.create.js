"use strict";

module.exports = (server) => {
  const Schema = require("../../../schema/order.schema");
  const { payload: payloadSchema } = Schema.create(server);

  const {
    controllers: {
      order: { create },
    },
    helpers: {
      permissions: { isUser },
    },
  } = server.app;

  return {
    method: "POST",
    path: "/order",
    config: {
      pre: [
        {
          method: isUser,
          assign: "user",
        },
      ],
      handler: create,
      auth: "jwt",
      validate: {
        payload: payloadSchema,
      },
    },
  };
};
