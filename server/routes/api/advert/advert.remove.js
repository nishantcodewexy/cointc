"use strict";

module.exports = (server) => {
  const Schema = require("../../../schema/advert.schema");
  const { params: paramsSchema, payload: payloadSchema } = Schema.remove(
    server
  );
  const {
    controllers: {
      advert: { remove },
    },
    helpers: {
      permissions: { isUser },
    },
  } = server.app;

  return {
    method: "DELETE",
    path: "/ads/{id}",
    config: {
      pre: [
        {
          method: isUser,
          assign: "user",
        },
      ],
      handler: remove,
      auth: "jwt",
      validate: {
        params: paramsSchema,
        payload: payloadSchema,
      },
    },
  };
};
