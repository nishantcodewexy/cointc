"use strict";

module.exports = (server) => {
  const Schema = require("../../../schema/user.schema")(server);
  const { payload } = Schema?.reset();

  const {
    controllers: {
      user: { resetPassword },
    },
  } = server.app;

  return {
    method: "POST",
    path: "/auth/reset",
    config: {
      handler: resetPassword,
      validate: {
        payload,
      },
    },
  };
};
