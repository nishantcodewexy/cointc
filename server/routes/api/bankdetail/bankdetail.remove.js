"use strict";

module.exports = (server) => {
  const Schema = require("../../_schema/bankdetail.schema");
  const {params} = Schema?.remove(server);

  const {
    controllers: {
      bankdetail: { remove },
    },
    helpers: {
      permissions: { isUser },
    },
  } = server.app;

  return {
    method: "DELETE",
    path: "/bank-details/{id}",
    config: {
      pre: [
        {
          method: isUser,
          assign: "user",
        },
      ],
      handler: remove,
      auth: "jwt",
      validate: {
        params
      },
    },
  };
};
