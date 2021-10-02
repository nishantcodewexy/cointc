"use strict"
module.exports = (server) => {
  const {
    controllers: {
      wallet: { balanceOf },
    },
    helpers: { jwt: {decodeUser} },
  } = server.app;

  return {
    method: ["GET"],
    path: "/wallet/balanceOf",
    config: {
      pre: [
        {
          method: decodeUser,
          assign: "user",
        },
      ],
      handler: balanceOf,
      auth: "jwt",
    },
  };
};
