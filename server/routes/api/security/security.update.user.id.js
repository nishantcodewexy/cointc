"use strict";

module.exports = (server) => {
  const {
    controllers: {
      security: { updateByUserID },
    },
    helpers: {
      permissions: { isUser },
    },
  } = server.app;

  return {
    method: ["PUT"],
    path: "/security/{user_id}",
    config: {
      pre: [
        {
          method: isUser,
          assign: "user",
        },
      ],
      handler: updateByUserID,
      auth: "jwt",
    },
  };
};
