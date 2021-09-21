"use strict";

module.exports = (server) => {
  const {
    controllers: {
      wallet: { profile },
    },
    helpers: {
      jwt: { decodeUser },
    },
  } = server.app;

  return {
    method: ["GET"],
    path: "/wallet",
    config: {
      pre: [
        {
          method: decodeUser,
          assign: "user",
        },
      ],
      handler: profile,
      auth: "jwt",
    },
  };
};
