"use strict";

module.exports = (server) => {
  const Schema = require("../../../schema/user.schema");
  const { payload: payloadSchema } = Schema?.register(server);

  const {
    controllers: {
      user: { registerMe },
    },
   
  } = server.app;

  return {
    method: "POST",
    path: `/auth/register`,
    config: {     
      handler: registerMe,
      validate: {
        payload: payloadSchema,
      },
    },
  };
};
