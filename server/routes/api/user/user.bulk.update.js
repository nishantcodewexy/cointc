"use strict";
const Joi = require("joi");
module.exports = (server) => {
  const {
    controllers: {
      user: { bulkUpdate },
    },
    helpers: {
      permissions: { isAdminOrError },
    },
  } = server.app;

  const schema = Joi.object({
    data: Joi.array().items(
      Joi.object({
        id: Joi.string().uuid(),
        mode: Joi.string().optional(),
        nickname: Joi.string().optional(),      
      })
    ),
    suspend: Joi.boolean().optional(),
  });

  return {
    method: "PUT",
    path: "/user",
    config: {
      pre: [
        {
          method: isAdminOrError,
          assign: "user",
        },
      ],
      handler: bulkUpdate,
      auth: "jwt",
      validate: {
        payload: schema,
      },
    },
  };
};
