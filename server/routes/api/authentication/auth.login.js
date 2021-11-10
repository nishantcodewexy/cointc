"use strict";

module.exports = (server) => {
  const Schema = require("../../../schema/user.schema")(server);
  const { payload: payloadSchema } = Schema?.login();

  const {
    controllers: {
      user: { authenticate },
    },
  } = server.app;

  return {
    method: "POST",
    path: "/auth/login",
    config: {
      handler: authenticate,
      validate: {
        payload: payloadSchema,
      },
    },
  };
};
