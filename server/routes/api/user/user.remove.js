"use strict";
const Joi = require("joi");
module.exports = (server) => {
  const Schema = require("../../../schema/user.schema");
  const { params: paramsSchema, payload: payloadSchema } = Schema.remove(
    server
  );

  const {
    controllers: {
      user: { remove },
    },
    helpers: {
      permissions: { isUser },
    },
  } = server.app;

  return {
    method: "DELETE",
    path: "/users/{id}",
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
