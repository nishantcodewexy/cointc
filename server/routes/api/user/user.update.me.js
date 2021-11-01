"use strict";

module.exports = (server) => {
  const Schema = require("../../../schema/user.schema");
  const { payload: payloadSchema } = Schema.updateMe(server);

  const {
    controllers: {
      user: { updateMe },
    },
    helpers: {
      permissions: { isUser },
    },
  } = server.app;

  return {
    method: "PUT",
    path: "/user",
    config: {
      pre: [
        {
          method: isUser,
          assign: "user",
        },
      ],
      handler: updateMe,
      auth: "jwt",
      validate: {
        payload: payloadSchema,
      },
    },
  };
};
