"use strict";

module.exports = (server) => {
  const Schema = require("../../_schema/bankdetail.schema");
  const schema = Schema?.update(server);

  const {
    controllers: {
      bankdetail: { update },
    },
    helpers: {
      permissions: { isUser },
    },
  } = server.app;

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
