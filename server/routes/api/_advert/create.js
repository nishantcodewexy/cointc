"use strict";

module.exports = (server) => {
  const Schema = require('../../../schema/advert.schema')
  const { payload: payloadSchema } = Schema.create(server);

  const {
    controllers: {
      advert: { create },
    },
    helpers: {
      jwt: { decodeUser },
    },
  } = server.app;


  return {
    method: "POST",
    path: "/adverts",
    config: {
      pre: [
        {
          method: decodeUser,
          assign: "user",
        },
      ],
      handler: create,
      validate: {
        payload: payloadSchema,
      },
      auth: "jwt",
    },
  };
};
