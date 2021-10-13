module.exports = (server) => {
  const {
    controllers: {
      user: { archive },
    },
    helpers: { jwt: {decodeUser} },
  } = server.app;

  return {
    method: ["GET"],
    path: `/users/statistics`,
    config: {
      pre: [
        {
          method: decodeUser,
          assign: "user",
        },
      ],
      handler: ()=>null,
      auth: "jwt",
    },
  };
};
