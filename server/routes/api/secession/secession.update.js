"use strict";
const Joi = require("joi");
module.exports = (server) => {
  const {
    controllers: {
      secession: { update },
    },
    helpers: {
      permissions: { isUser },
    },
  } = server.app;

  const schema = Joi.object({
    level: Joi.number().greater(0),
    status: Joi.string().valid("pending", "accept", "deny"),
  });

  return {
    method: "PUT",
    path: "/secession/{id}",
    config: {
      pre: [
        {
          method: isUser,
          assign: "user",
        },
      ],
      handler: update,
      auth: "jwt",
      validate: {
        payload: schema,
      },
    },
  };
};
