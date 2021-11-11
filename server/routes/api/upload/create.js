"use strict";
const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      upload: { create },
    },

    helpers: {
      permissions: { isUser },
    },
  } = server.app;

  return {
    method: "POST",
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
      handler: create,
      auth: "jwt",
      payload: {
        output: "stream",
        parse: true,
        allow: "multipart/form-data",
        multipart: true,
      },
    },
  };
};
