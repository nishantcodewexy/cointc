"use strict";

module.exports = (server) => {
  const {
    controllers: {
      user: { getAllUser },
    },
  } = server.app;

  return {
    method: ["GET"],
    path: "/user/",
    config: {
      handler: getAllUser,
    },
  };
};
