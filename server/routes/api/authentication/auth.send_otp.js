"use strict";

const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      user: { sendOTP },
    },
    boom,
  } = server.app;

  // define Joi schema
  const schema = Joi.object({
    id: Joi.string()
      .uuid()
      .required()
      .error(boom.badRequest("Required input <id::uuid> is invalid")),
  });

  return {
    method: "POST",
    path: "/auth/otp",
    config: {
      handler: sendOTP,
      validate: {
        payload: schema,
      },
    },
  };
};
