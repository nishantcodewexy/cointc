const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      ads: { retrieve },
    },
  } = server.app;

  const schema = Joi.object({
    ad: Joi.string().required(),
  });

  return {
    method: "POST",
    path: "/ads/{ad?}",
    config: {
      handler: retrieve,
      validate: {
        payload: schema,
      },
    },
  };
};
