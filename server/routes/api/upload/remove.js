"use strict";
const Joi = require("joi");
module.exports = (server) => {
  const {
    controllers: {
      upload: { remove },
    },
    helpers: {
      permissions: { isUser },
    },
  } = server.app;

  const schema = Joi.array().items(Joi.string().uuid());

  return {
    method: "DELETE",
    path: "/upload",
    config: {
      pre: [
        [
          {
            method: isUser,
            assign: "user",
          },
        ],
      ],
      handler: remove,
      auth: "jwt",
      validate: {
        payload: schema,
      },
    },
  };
};
