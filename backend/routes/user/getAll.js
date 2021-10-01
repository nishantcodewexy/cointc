"use strict";

module.exports = (server) => {
  const { getAllUser } = server.app.controllers.user;

  return {
    method: ["GET"],
    path: "/user",
    config: {
      handler: getAllUser,
    },
  };
};
