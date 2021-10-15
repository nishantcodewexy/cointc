"use strict";
const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      currency: { bulkCreate },
    },
    helpers: {
      permissions: { isAdminOrError },
    },
  } = server.app;

  const schema = Joi.array().items(
    Joi.object({
      type: Joi.string().required(),
      iso_code: Joi.string().required(),
      name: Joi.string().required(),
    })
  );

  return {
    method: "POST",
    path: "/currency/bulk",
    config: {
      pre: [
        [
          {
            method: isAdminOrError,
            assign: "user",
          },
        ],
      ],
      handler: bulkCreate,
      auth: "jwt",
      validate: {
        payload: schema,
      },
    },
  };
};
