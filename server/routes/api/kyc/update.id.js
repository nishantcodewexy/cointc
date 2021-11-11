"use strict";
const { required } = require("joi");
const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      kyc: {  updateByID },
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

  const payloadSchema = Joi.object().keys({
    status: Joi.string()
      .allow("PENDING", "ACCEPT", "DENY")
      .optional(),
    document_id: Joi.string().uuid()
      .optional(),
  }).or('status', 'document_id');

  // .allow("email", "id", "phone", "payment_methods").optional()

  return {
    method: "PUT",
    path: "/kyc/{id}",
    config: {
      pre: [
        {
          method: isUser,
          assign: "user",
        },
      ],
      handler: updateByID,
      validate: {
        params: paramsSchema,
        payload: payloadSchema,
      },
      auth: "jwt",
    },
  };
};
