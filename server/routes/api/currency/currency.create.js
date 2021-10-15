"use strict";
const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      currency: { create },
    },
    boom,
    helpers: {
      permissions: { isAdminOrError },
    },
  } = server.app;

  const schema = Joi.object({
    iso_code: Joi.string().required().error(boom.badRequest('Bad currency symbol input')),
    name: Joi.string().required().error(boom.badRequest('Bad currency full name input')),
    type: Joi.string().required().error(boom.badRequest('Bad currecny type input')),
  }).error(boom.badRequest('Invalid input. Currency payload object expected'));

  return {
    method: "POST",
    path: "/currency",
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
