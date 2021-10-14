"use strict";
const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      currency: { bulkCreate },
    },
    consts: { roles: _roles },
    helpers: {
      permissions: { isUser },
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
    path: "/currency",
    config: {
      pre: [
        [
          {
            method: isUser,
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
