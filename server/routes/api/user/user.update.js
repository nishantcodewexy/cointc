"use strict";
const Joi = require("joi");
module.exports = (server) => {
  const {
    controllers: {
      user: { update },
    },
    consts: { roles: _roles },
    helpers: {
      permissions: { isAdminOrError },
    },
  } = server.app;

  return {
    method: "PUT",
    path: "/user/{id}",
    config: {
      pre: [
        {
          method: isAdminOrError,
          assign: "user",
        },
      ],
      handler: update,
      auth: "jwt",
    },
  };
};
