"use strict";
const Joi = require("joi");
const schema = require("../../../validators")

module.exports = (server) => {
  const {
    controllers: {
      user: { updateMe },
    },
    consts: { roles: _roles },
    helpers: {
      permissions: { isUser },
      handleValidationWithRole
    },
  } = server.app;

  return {
    method: ["PUT", "PATCH"],
    path: "/users/me",
    config: {
      pre: [
        {
          method: isUser,
          assign: "user",
        },
        {
          method: handleValidationWithRole({
            admin:schema.adminUserProfileUpdateSchema,
            basic:schema.basicUserProfileUpdateSchema
          },
          server.app.helpers
          ),
          assign: "data",
        },
      ],
      handler: updateMe,
      auth: "jwt",
    },
  };
};
