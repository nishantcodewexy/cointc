module.exports = (server) => {
  const {
    controllers: {
      wallet: { get, getAll },
    },
  } = server.app;

  return {
    method: ["GET"],
    path: "/wallet/{wallet?}",
    config: {
      pre: [
        [
          // To be executed in parallel
          {
            method: server.app.helpers.getJWTDecodedUser,
            assign: "user",
          },
          {
            method: (req, h) => {
              const { id } = req.params;
              return id ? get : getAll;
            },
            assign: "fetch",
          },
        ],
      ],
      handler: (req, h) => req.pre.fetch(req, h),
      auth: "jwt",
    },
  };
};
