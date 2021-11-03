"use strict";

module.exports = (server) => {
  const Schema = require("../../../schema/user.schema")(server);
  const { params: paramsSchema } = Schema.find();
  const {
    controllers: {
      user: { findByID },
    },
    helpers: {
      permissions: { isAdminOrError },
    },
  } = server.app;

  return {
    method: "GET",
    path: "/user/{id}",
    config: {
      pre: [
        {
          method: isAdminOrError,
          assign: "user",
        },
      ],
      handler: findByID,
      auth: "jwt",
      validate: {
        params: paramsSchema,
      },
    },
  };
};
