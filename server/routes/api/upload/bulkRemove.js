"use strict";
const Joi = require("joi");
module.exports = (server) => {
  const {
    controllers: {
      upload: { bulkRemove },
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
      handler: bulkRemove,
      auth: "jwt",
      validate: {
        payload: schema,
      },
    },
  };
};
