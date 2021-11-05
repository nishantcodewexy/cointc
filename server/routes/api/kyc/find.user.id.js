"use strict";
const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      kyc: { findAll, findByUserID },
    },
    boom,
    helpers: {
      permissions: { isUser },
    },
  } = server.app;

  const paramsSchema = Joi.object({
    user_id: Joi.string().uuid().required(),
  });

  // .allow("email", "id", "phone", "payment_methods").optional()

  return {
    method: "GET",
    path: "/kyc/with/{user_id}",
    config: {
      pre: [
        {
          method: isUser,
          assign: "user",
        },
      ],
      handler: findByUserID,
      validate: {
        params: paramsSchema,
      },
      auth: "jwt",
    },
  };
};
