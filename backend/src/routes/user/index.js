module.exports = (server) => {
  return {
    method: ["POST", "GET", "PUT"],
    path: "/user/",
    config: {
      pre: [
        {
          method: server.app.helpers.getJWTDecodedUser,
          assign: "user",
        },
      ],
      handler: server.app.controllers.user.profile,
      auth: "jwt",
    },
  };
};
