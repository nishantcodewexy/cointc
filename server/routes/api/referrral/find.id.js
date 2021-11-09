"use strict";
const Joi = require('joi')
module.exports = (server) => {
  const {
    controllers: {
      referral: { findByID },
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
    path: "/referral/{id}",
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
