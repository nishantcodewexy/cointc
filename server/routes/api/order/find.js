"use strict";

module.exports = (server) => {
  const {
    controllers: {
      order: { find },
    },
    /*  helpers: {
      permissions: { isUser },
    }, */
  } = server.app;

  return {
    method: "GET",
    path: "/order",
    config: {
      /* pre: [
        {
          method: isUser,
          assign: "user",
        },
      ], */
      handler: find,
      // auth: "jwt",
    },
  };
};
