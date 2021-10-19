"use strict";
const Joi = require("joi");
module.exports = (server) => {
  const {
    controllers: {
      currency: { remove },
    },
    consts: { roles: _roles },
    helpers: {
      permissions: { isAdminOrError },
    },
  } = server.app;

  const payloadSchema = Joi.object({
    force: Joi.boolean()
      .default(false)
      .optional(),
  });
  const paramSchema = Joi.object({
    id: Joi.string()
      .uuid()
      .required()
      .error(new Error("Invalid ID provided")),
  });

  return {
    method: "DELETE",
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
      handler: remove,
      auth: "jwt",
      validate: {
        payload: payloadSchema,
        params: paramSchema,
      },
    },
  };
};
