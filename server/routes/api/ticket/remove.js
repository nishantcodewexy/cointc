"use strict";
const Joi = require("joi");
module.exports = (server) => {
  const {
    controllers: {
      support_ticket: { remove },
    },
    helpers: {
      permissions: { isUser },
    },
  } = server.app;


  return {
    method: "DELETE",
    path: "/ticket/{id}",
    config: {
      pre: [
        {
          method: isUser,
          assign: "user",
        },
      ],
      handler: remove,
      auth: "jwt",
    },
  };
};
