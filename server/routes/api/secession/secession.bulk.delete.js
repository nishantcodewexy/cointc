"use strict";
const Joi = require("joi");
module.exports = (server) => {
  const {
    controllers: {
      secession: { bulkDelete },
    },
    consts: { roles: _roles },
    helpers: {
      permissions: { isUser },
    },
  } = server.app;

  const schema = Joi.array().items(Joi.string());
  return {
    method: "DELETE",
    path: "/secessions",
    config: {
      pre: [
        {
          method: isUser,
          assign: "user",
        },
      ],
      handler: bulkDelete,
      auth: "jwt",
      validate: {
        payload: schema,
      },
    },
  };
};
