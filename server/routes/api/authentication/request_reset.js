"use strict";

module.exports = (server) => {
  const Schema = require("../../../schema/user.schema")(server);
  const { payload } = Schema?.requestReset();

  const {
    controllers: {
      user: { requestPasswordReset },
    },
  } = server.app;

  return {
    method: "POST",
    path: "/auth/reset/request",
    config: {
      handler: requestPasswordReset,
      validate: {
        payload,
      },
    },
  };
};
