"use strict";
const Joi = require("joi");
module.exports = (server) => {
  const {
    controllers: {
      secession: { remove },
    },
    helpers: {
      permissions: { isAdminOrError },
    },
  } = server.app;

  return {
    method: "DELETE",
    path: "/secessions/{id}",
    config: {
      pre: [
        {
          method: isAdminOrError,
          assign: "user",
        },
      ],
      handler: remove,
      auth: "jwt",
    },
  };
};
