"use strict";

module.exports = (server) => {
  const Schema = require("../../../schema/advert.schema");
  const { payload: payloadSchema } = Schema.create(server);

  const {
    controllers: {
      advert: { create },
    },
    helpers: {
      permissions: { isUser },
    },
  } = server.app;

  return {
    method: "POST",
    path: "/ads",
    config: {
      pre: [
        {
          method: isUser,
          assign: "user",
        },
      ],
      handler: create,
      validate: {
        payload: payloadSchema,
      },
      auth: "jwt",
    },
  };
};
