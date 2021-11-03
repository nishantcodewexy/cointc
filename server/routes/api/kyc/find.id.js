"use strict";
const { required } = require("joi");
const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      kyc: { findByID },
    },
    boom,
    helpers: {
      permissions: { isUser },
    },
  } = server.app;

  const paramsSchema = Joi.object({
    id: Joi.string()
      .uuid()
      .required(),
  }).error(new Error(`Error in params object`));

  const querySchema = Joi.object()
    .keys({
      sudo: Joi.string().optional(),
      fake: Joi.string().optional(),
      fake_count: Joi.number()
        .integer()
        .optional(),
      filter: Joi.object().keys({
        status: Joi.string().allow("ACCEPT", "DENY", "PENDING"),
        type: Joi.string().allow("email", "id", "sms"),
      }),
    })
    .allow({});
  return {
    method: "GET",
    path: "/kyc/{id}",
    config: {
      pre: [
        {
          method: isUser,
          assign: "user",
        },
      ],
      handler: findByID,
      validate: {
        params: paramsSchema,
        query: querySchema,
      },
      auth: "jwt",
    },
  };
};
