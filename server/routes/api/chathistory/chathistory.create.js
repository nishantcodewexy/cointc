"use strict";
const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      chathistory: { create },
    },
    consts: {
      types: { country },
    },
    helpers: {
      permissions: { isAdminOrError },
    },
  } = server.app;

  const schema = Joi.object({
    country: Joi.string()
      .valid(...Object.keys(country))
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
            method: isAdminOrError,
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
