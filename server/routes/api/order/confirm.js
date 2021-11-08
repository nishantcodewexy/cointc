"use strict";

module.exports = (server) => {
  const Schema = require("../../../schema/order.schema");
  const { params: paramsSchema } = Schema.confirm(server);

  const {
    controllers: {
      order: { confirmByID },
    },
    helpers: {
      permissions: { isUser },
    },
  } = server.app;
  
  return {
    method: "POST",
    path: "/order/{id}/confirm",
    config: {
      pre: [
        {
          method: isUser,
          assign: "user",
        },
      ],
      handler: confirmByID,
      auth: "jwt",
      validate: {
        params: paramsSchema,
      },
    },
  };
};
