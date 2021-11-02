"use strict";

module.exports = (server) => {
  const {
    controllers: {
      user: { retrieveMe },
    },
    helpers: {
      permissions: { isUser },
    },
  } = server.app;

  return {
    method: "GET",
    path: "/user/me",
    config: {
      pre: [
        {
          method: isUser,
          assign: "user",
        },
      ],
      handler: retrieveMe,
      auth: "jwt",
    },
  };
};
