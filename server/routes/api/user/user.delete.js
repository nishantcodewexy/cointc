"use strict";
const Joi = require("joi");
module.exports = (server) => {
  const {
    controllers: {
      user: { remove },
    },
    consts: { roles: _roles },
    helpers: {
      permissions: { isUser },
    },
  } = server.app;

  const schema = Joi.object({
    force: Joi.boolean()
      .default(false)
      .optional(),
  });

  return {
    method: "DELETE",
    path: "/users/{id}",
    config: {
      pre: [
        {
          method: isUser,
          assign: "user",
        },
      ],
      handler: remove,
      auth: "jwt",
      validate: {
        payload: schema,
      },
    },
  };
};
