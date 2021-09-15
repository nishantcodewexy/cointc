const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      ads: { get, getAll },
    },
  } = server.app;

  const schema = Joi.object({
    ad: Joi.string().required(),
  });

  return {
    method: "GET",
    path: "/ads/{ad?}",
    config: {
      // pre-handler
      pre: [
        [
          // To be executed in parallel
          {
            method: server.app.helpers.getJWTDecodedUser,
            assign: "user",
          },
          {
            method: (req, h) => {
              const { ad } = req.params;
              return ad ? get : getAll;
            },
            assign: "fetch",
          },
        ],
      ],
      handler: (req, h) => req.pre.fetch(req, h),
      validate: {
        payload: schema,
      },
      auth: 'jwt'
    },
  };
};
