"use strict";
const Joi = require("joi");
const schema = require("../../../validators");

module.exports = (server) => {
  const {
    controllers: {
      user: { update },
    },
    helpers: {
      permissions: { isAdminOrError },
      handleValidation,
    },
  } = server.app;

  return {
    method: ["PUT", "PATCH"],
    path: "/users/{id}",
    config: {
      pre: [
        [
          {
            method: isAdminOrError,
            assign: "user",
          },
          {
            method: handleValidation(schema.adminUpdateUserSchema),
            assign: "validator",
          },
        ],
      ],
      handler: update,
      auth: "jwt",
    },
  };
};
