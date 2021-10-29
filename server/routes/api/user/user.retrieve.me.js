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
    path: "/user/{id}",
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
