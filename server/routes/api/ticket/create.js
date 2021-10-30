"use strict";
const Joi = require("joi");
module.exports = (server) => {
  const {
    controllers: {
      support_ticket: { create },
    },

    helpers: {
      permissions: { isUser },
    },
  } = server.app;

  const schema = Joi.object({
    description: Joi.string().required(),
  });

  return {
    method: "POST",
    path: "/ticket",
    config: {
      pre: [
        {
          method: isUser,
          assign: "user",
        },
      ],
      handler: create,
      auth: "jwt",
      validate: {
        payload: schema,
      },
    },
  };
};
