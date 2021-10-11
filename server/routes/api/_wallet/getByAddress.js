"use strict";
const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      wallet: { getByAddress },
    },
    helpers: {
      jwt: { decodeUser },
    },
  } = server.app;

  const schema = Joi.object({
    address: Joi.string().required(),
  });

  return {
    method: ["GET"],
    path: "/wallet/{address}",
    config: {
      pre: [
        {
          method: decodeUser,
          assign: "user",
        },
      ],
      handler: getByAddress,
      validate: {
        params: schema,
      },
      auth: "jwt",
    },
  };
};
