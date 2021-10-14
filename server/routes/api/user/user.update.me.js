"use strict";
const Joi = require("joi");
module.exports = (server) => {
  const {
    controllers: {
      user: { updateMe },
    },
    consts: { roles: _roles },
    helpers: {
      permissions: { isUser },
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
      ],
      handler: updateMe,
      auth: "jwt",
    },
  };
};
