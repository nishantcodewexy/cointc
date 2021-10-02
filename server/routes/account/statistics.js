module.exports = (server) => {
  const {
    controllers: {
      user: { archive },
    },
    helpers: { jwt: {decodeUser} },
  } = server.app;

  return {
    method: ["GET"],
    path: `/account/statistics`,
    config: {
      pre: [
        {
          method: decodeUser,
          assign: "user",
        },
      ],
      handler: ()=>{ },
      auth: "jwt",
    },
  };
};
