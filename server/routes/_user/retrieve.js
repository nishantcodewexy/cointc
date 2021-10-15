"use strict";
const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      user: { findID },
    },
    helpers: {
      jwt: { decodeUser },
    },
  } = server.app;

  const schema = Joi.object({
    id: Joi.string().required(),
  });
  
  return {
    method: "GET",
    path: "/user/{id}",
    config: {
      pre: [
        {
          method: decodeUser,
          assign: "user",
        },
      ],
      handler: findID,
      validate: {
        params: schema,
      },
      auth: "jwt",
    },
  };
};