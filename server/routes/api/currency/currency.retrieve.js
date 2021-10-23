"use strict";

module.exports = (server) => {
/*   const Schema = require("../../_schema/currency.schema");
  const { payload: payloadSchema } = Schema.bulkRetrieve(server);
 */
  const {
    controllers: {
      currency: { retrieve },
    },
    helpers: {
      permissions: { isUser },
    },
  } = server.app;

  return {
    method: "GET",
    path: "/currency/{id}",
    config: {
      pre: [
        {
          method: isUser,
          assign: "user",
        },
      ],
      handler: retrieve,
      auth: "jwt",
    },
  };
};
