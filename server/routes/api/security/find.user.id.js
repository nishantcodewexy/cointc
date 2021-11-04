"use strict";
const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      security: { findByUserID },
    },
    helpers: {
      permissions: { isUser },
    },
  } = server.app;

  const schema = Joi.object({});

  return {
    method: ["GET"],
    path: "/security/{user_id}",
    config: {
      pre: [
        {
          method: isUser,
          assign: "user",
        },
      ],
      handler: findByUserID,
      validate: {
        params: schema,
      },
      auth: "jwt",
    },
  };
};
