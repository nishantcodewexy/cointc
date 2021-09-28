"use strict";

module.exports = (server) => {
  const {
    controllers: {
      user: { profileByID },
    },
  } = server.app;

  return {
    method: ["GET"],
    path: "/user/find_id",
    config: {
      handler: profileByID,
    },
  };
};
