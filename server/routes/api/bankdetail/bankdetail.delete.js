"use strict";
const Joi = require("joi");
module.exports = (server) => {
  const {
    controllers: {
      bankdetail: { destroy },
    },
    consts: { roles: _roles },
    helpers: {
      permissions: { isUser },
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
      ],
      handler: destroy,
      auth: "jwt",
    },
  };
};
