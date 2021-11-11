"use strict";
const Joi = require('joi')
module.exports = (server) => {
  const {
    controllers: {
      affiliate: { findByID },
    },
    helpers: {
      permissions: { isAdminOrError },
    },
  } = server.app;

  const schema = Joi.object({
    id: Joi.string().uuid(),
  });
  return {
    method: "GET",
    path: "/affiliate/{id}",
    config: {
      pre: [
        {
          method: isAdminOrError,
          assign: "user",
        },
      ],
      handler: findByID,
      auth: "jwt",
      validate: {
        params: schema,
      },
    },
  };
};
