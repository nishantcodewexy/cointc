"use strict";
const { required } = require("joi");
const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      kyc: { update },
    },
    boom,
    helpers: {
      permissions: { isUser },
    },
  } = server.app;

  const payloadSchema = Joi.alternatives()
    .try(
      Joi.object()
        .keys({
          id: Joi.string()
            .uuid()
            .optional(),
          type: Joi.string()
            .allow("email", "id", "phone", "payment_methods")
            .optional(),
        })
        .or("type", "id"),
      Joi.object()
        .keys({
          ids: Joi.array().items(Joi.string().uuid()),
          status: Joi.string()
            .allow("PENDING", "ACCEPT", "DENY")
            .optional(),
        })
        .or("ids", "status")
    )
    .error(new Error(`Error in payload object`));

  return {
    method: "PUT",
    path: "/kyc",
    config: {
      pre: [
        {
          method: isUser,
          assign: "user",
        },
      ],
      handler: update,
      validate: {
        payload: payloadSchema,
      },
      auth: "jwt",
    },
  };
};
