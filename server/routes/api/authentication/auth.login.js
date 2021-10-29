"use strict";

module.exports = (server) => {
  const Schema = require("../../../schema/user.schema");
  const { payload: payloadSchema } = Schema.authenticate(server);

  const {
    controllers: {
      user: { authenticate },
    },
  } = server.app;

  return {
    method: "POST",
    path: "/auth/authenticate",
    config: {
      handler: authenticate,
      validate: {
        payload: payloadSchema,
      },
    },
  };
};
