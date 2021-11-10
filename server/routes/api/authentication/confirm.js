"use strict";
const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      user: { confirmByEmail },
    },
    boom,
  } = server.app;

  // define Joi schema
  const payload = Joi.object({
    token: Joi.string()
      .required()
      .error(
        boom.badRequest("Required input <token::string> is invalid or missing")
      ),
    email: Joi.string()
      .email()
      .required()
      .error(
        boom.badRequest("Required input <email::string> is invalid or missing")
      ),
  });

  return {
    method: "POST",
    path: "/auth/confirm",
    config: {
      handler: confirmByEmail,
      validate: {
        payload,
      },
    },
  };
};
