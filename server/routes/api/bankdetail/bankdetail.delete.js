"use strict";
const Joi = require("joi");
module.exports = (server) => {
  const {
    controllers: {
      bankdetail: { destroy },
    },
    consts: { roles: _roles },
    helpers: {
      permissions: { isUser,isAdminOrError },
    },
  } = server.app;

  return {
    method: "DELETE",
    path: "/bank-details/{id}",
    config: {
      pre: [
        {
          method: isUser,
          assign: "user",
        },
        {
          method: isAdminOrError,
          assign: "isAdmin",
        },
      ],
      handler: destroy,
      auth: "jwt",
    },
  };
};
