"use strict";

module.exports = (server) => {
  const Schema = require("../../../schema/user.schema");
  const { payload: payloadSchema } = Schema.remove(server);

  const {
    controllers: {
      user: { removeMe },
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
      handler: removeMe,
      auth: "jwt",
      validate: {
        payload: payloadSchema,
      },
    },
  };
};
