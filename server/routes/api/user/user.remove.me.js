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
      permissions: { isUser },
    },
  } = server.app;

  return {
    method: "DELETE",
    path: "/user",
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
        payload: payloadSchema,
      },
    },
  };
};
