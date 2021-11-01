"use strict";

module.exports = (server) => {
  const Schema = require("../../../schema/user.schema");
  const { payload: payloadSchema } = Schema?.create(server);

  const {
    controllers: {
      user: { create },
    },
    helpers: {
      permissions: { isAdminOrError },
    },
  } = server.app;

  return {
    method: "POST",
    path: "/user",
    config: {
      pre: [
        {
          method: isAdminOrError,
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
