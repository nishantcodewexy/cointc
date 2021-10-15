"use strict";
const Joi = require("joi");
module.exports = (server) => {
  const {
    controllers: {
      secession: { bulkRemove },
    },
    helpers: {
      permissions: { isAdminOrError },
    },
  } = server.app;

  const schema = Joi.array().items(Joi.string().uuid());

  return {
    method: "DELETE",
    path: "/secession",
    config: {
      pre: [
        {
          method: isAdminOrError,
          assign: "user",
        },
      ],
      handler: bulkRemove,
      auth: "jwt",
      validate: {
        payload: schema,
      },
    },
  };
};
