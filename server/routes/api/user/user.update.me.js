"use strict";

module.exports = (server) => {
  const {
    controllers: {
      user: { updateMe },
    },
    helpers: {
      permissions: { isUser },
    },
  } = server.app;

  return {
    method: "PUT",
    path: "/user",
    config: {
      pre: [
        {
          method: isUser,
          assign: "user",
        },
      ],
      handler: updateMe,
      auth: "jwt",
    },
  };
};
