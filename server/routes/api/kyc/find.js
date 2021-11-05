"use strict";
const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      kyc: { find },
    },
    helpers: {
      permissions: { isUser },
    },
  } = server.app;
  const querySchema = Joi.object()
    .keys({
      sudo: Joi.string().optional(),
      fake: Joi.string().optional(),
      fake_count: Joi.number()
        .integer()
        .optional(),
      filter: Joi.object().keys({
        status: Joi.string().allow("ACCEPT", "DENY", "PENDING"),
        type: Joi.string().allow('email', 'id', 'sms')
      }),
    })
    .allow({});

  return {
    method: "GET",
    path: "/kyc",
    config: {
      pre: [
        {
          method: isUser,
          assign: "user",
        },
      ],
      handler: find,
      auth: "jwt",
      validate: { query: querySchema },
    },
  };
};
