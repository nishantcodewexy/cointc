const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      ads: { delete },
    },
  } = server.app;

  const schema = Joi.object({
    ad: Joi.string().required(),
  });

  return {
    method: "POST",
    path: "/ads/delete",
    config: {
      handler: delete,
      validate: {
        payload: schema,
      },
    },
  };
};
