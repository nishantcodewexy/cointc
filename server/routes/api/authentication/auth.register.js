"use strict";

module.exports = (server) => {
  const Schema = require("../../../schema/user.schema")(server);
  const { payload: payloadSchema } = Schema?.register();

  const {
    controllers: {
      user: { register },
    },
   
  } = server.app;

  return {
    method: "POST",
    path: `/auth/register`,
    config: {     
      handler: register,
      validate: {
        payload: payloadSchema,
      },
    },
  };
};
