"use strict";
const Joi = require("joi");
module.exports = (server) => {
  const {
    controllers: {
      secession: { updateByID },
    },
    helpers: {
      permissions: { isUser },
    },
  } = server.app;

  const payload = Joi.object({
    level: Joi.number().greater(0),
    status: Joi.string().valid("pending", "accept", "deny"),
  });
  const params = Joi.object({
    id: Joi.string().uuid(),
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
      handler: updateByID,
      auth: "jwt",
      validate: {
        payload,
        params,
      },
    },
  };
};
