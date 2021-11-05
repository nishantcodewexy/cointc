"use strict";

module.exports = (server) => {
  const {
    controllers: {
      security: { removeByUserID },
    },
    helpers: {
      permissions: { isUser },
    },
  } = server.app;

  return {
    method: ["DELETE"],
    path: "/security/{user_id}",
    config: {
      pre: [
        {
          method: isUser,
          assign: "user",
        },
      ],
      handler: removeByUserID,
      auth: "jwt",
    },
  };
};
