const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      advert: { destroy },
    },
    helpers: { jwt: { decodeUser } },
  } = server.app;

  const schema = Joi.object({
    ad: Joi.string().required(),
  });

  return {
    method: "DELETE",
    path: "/ads/destroy",
    config: {
      pre: [
        {
          method: decodeUser,
          assign: "user",
        },
      ],
      handler: destroy,
      validate: {
        payload: schema,
      },
      auth: 'jwt'
    },
  };
};
