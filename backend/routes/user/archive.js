module.exports = (server) => {
  const {
    controllers: {
      user: { archive },
    },
    helpers: { jwt: {decodeUser} },
  } = server.app;

  return {
    method: ["POST", "DELETE", "PUT"],
    path: `/user/archive`,
    config: {
      pre: [
        {
          method: decodeUser,
          assign: "user",
        },
      ],
      handler: archive,
      auth: "jwt",
    },
  };
};
