"use strict";
const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      chathistory: { create },
    },
    consts: {
      countries,
    },
    helpers: {
      permissions: { isUser },
    },
  } = server.app;

  const schema = Joi.object({
    country: Joi.string()
      .valid(...Object.keys(countries))
      .required(),
    visitor_email: Joi.string()
      .email()
      .required(),
  });

  return {
    method: "POST",
    path: "/chat-history",
    config: {
      pre: [
        [
          {
            method: isUser,
            assign: "user",
          },
        ],
      ],
      handler: create,
      auth: "jwt",
      validate: {
        payload: schema,
      },
    },
  };
};
