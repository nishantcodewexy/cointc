"use strict";

module.exports = (server) => {
  const {
    controllers: {
      referral: { findByUserID },
    },
    helpers: {
      permissions: { isAdminOrError },
    },
  } = server.app;

  return {
    method: "GET",
    path: "/referral/{user_id}",
    config: {
      pre: [
        {
          method: isAdminOrError,
          assign: "user",
        },
      ],
      handler: findByUserID,
      auth: "jwt",
    },
  };
};
