"use strict";

module.exports = (server) => {
  const Schema = require("../../../schema/advert.schema");
  const { payload: payloadSchema } = Schema.update(server);
  const {
    controllers: {
      advert: { update },
    },
    helpers: {
      permissions: { isUser },
    },
  } = server.app;

  return {
    method: "PUT",
    path: "/ad",
    config: {
      pre: [{ method: isUser, assign: 'user' }],
      handler: update,
      auth: "jwt",
      validate: {
        payload: payloadSchema,
      },
    },
  };
};
