"use strict";
const Joi = require("joi");
module.exports = (server) => {
  const {
    controllers: {
      bankdetail: { create },
    },
    consts: {
      types: { banks, country, currencies },
    },
    boom,
    helpers: {
      permissions: { isUser },
    },
  } = server.app;

  const schema = Joi.object({
    account_no: Joi.string()
      .min(8)
      .max(15)
      .required()
      .error(boom.badRequest("Account number must be between 9 and 15")),
    bank_name: Joi.string()
      .valid(...Object.keys(banks))
      .required()
      .error(boom.badRequest("Bank name is invalid")),
    ifsc_code: Joi.string()
      .alphanum()
      .length(10)
      .required()
      .error(boom.badRequest("Invalid IFSC code")),
    country: Joi.string()
      .valid(...Object.keys(country))
      .required()
      .error(boom.badRequest("Country input is invalid")),
    currency: Joi.string()
      .valid(...Object.keys(currencies))
      .required()
      .error(boom.badRequest("Invalid currency input")),
  });

  return {
    method: "POST",
    path: "/bank-details",
    config: {
      pre: [
        {
          method: isUser,
          assign: "user",
        },
      ],
      handler: create,
      auth: "jwt",
      validate: {
        payload: schema,
      },
    },
  };
};
