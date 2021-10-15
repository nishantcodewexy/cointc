"use strict";
const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      currency: { update },
    },
    consts: { roles: _roles },
    helpers: {
      permissions: { isAdminOrError },
    },
  } = server.app;

  const schema = Joi.object({
    id: Joi.string()
      .uuid()
      .required(),
    type: Joi.string().optional(),
    iso_code: Joi.string().optional(),
    name: Joi.string().optional(),
    restore: Joi.bool().optional(),
  });

  return {
    method: ["PUT", "PATCH"],
    path: "/currency/{id}",
    config: {
      pre: [
        [
          {
            method: isAdminOrError,
            assign: "user",
          },
        ],
      ],
      handler: update,
      auth: "jwt",
      validate: {
        payload: schema,
      },
    },
  };
};
