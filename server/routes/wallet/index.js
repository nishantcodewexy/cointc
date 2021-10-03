"use strict";

module.exports = (server) => {
  const {
    controllers: {
      wallet: { getAll },
    },
    helpers: {
      jwt: { decodeUser },
    },
  } = server.app;

  return {
    method: ["GET"],
    path: "/wallets",
    config: {
      pre: [
        {
          method: decodeUser,
          assign: "user",
        },
      ],
      handler: getAll,
      auth: "jwt",
    },
  };
};
