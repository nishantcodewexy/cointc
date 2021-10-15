"use strict";
const Joi = require("joi");
module.exports = (server) => {
  const {
    controllers: {
      secession: { create },
    },
    helpers: {
      permissions: { isUser },
    },
  } = server.app;

  const schema = Joi.object({
    description: Joi.string(),
  });

  return {
    method: "POST",
    path: "/secessions",
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
