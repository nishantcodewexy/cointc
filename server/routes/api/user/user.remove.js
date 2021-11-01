"use strict";

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
      permissions: { isAdminOrError },
    },
  } = server.app;

  return {
    method: "DELETE",
    path: "/user/{id}",
    config: {
      pre: [
        {
          method: isAdminOrError,
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
