"use strict";
const Joi = require("joi");
module.exports = (server) => {
  const {
    controllers: {
      bankdetail: { update },
    },
    consts: {
      roles: _roles,
      types: { banks, country, currencies },
    },
    helpers: {
      permissions: { isUser },
    },
  } = server.app;

  const schema = Joi.object({
    account_no: Joi.string()
      .min(8)
      .max(15),
    bank_name: Joi.string().valid(...Object.keys(banks)),
    country: Joi.string().valid(...Object.keys(country)),
    currency: Joi.string().valid(...Object.keys(currencies)),
    ifsc_code: Joi.string().length(10),
  });

  return {
    method: ["PUT", "PATCH"],
    path: "/bank-details/{id}",
    config: {
      pre: [
        {
          method: isUser,
          assign: "user",
        },
      ],
      handler: update,
      auth: "jwt",
      validate: {
        payload: schema,
      },
    },
  };
};
