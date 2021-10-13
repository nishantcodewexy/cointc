"use strict";
const Joi = require("joi");
module.exports = (server) => {
  const {
    controllers: {
      user: { update },
    },
    consts: { roles: _roles },
    helpers: {
      permissions: { isUser },
    },
  } = server.app;

  return {
    method: ["PUT", "PATCH"],
    path: "/users/{id}",
    config: {
      // pre: [
      //   {
      //     method: isUser,
      //     assign: "user",
      //   },
      // ],
      handler: update,
      auth: "jwt",
    },
  };
};
