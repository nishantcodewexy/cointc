"use strict";

module.exports = (server) => {
  const Schema = require("../../../schema/user.schema");
  const { payload: payloadSchema } = Schema?.create(server);

  const {
    controllers: {
      user: { create },
    },
    helpers: {
      permissions: { isUser },
    },
  } = server.app;

  return {
    method: "POST",
    path: `/auth/register`,
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
    },
  };
};
