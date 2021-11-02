"use strict";

const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      referral: { create },
    },
    helpers: {
      permissions: { isAdminOrError },
    },
  } = server.app;

  const schema = Joi.object({
    referral_code: Joi.string()
      .length(10)
      .required(),
  });

  return {
    method: "POST",
    path: "/referral",
    config: {
      pre: [
        {
          method: isAdminOrError,
          assign: "isAdminOrError",
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
