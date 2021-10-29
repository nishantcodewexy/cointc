const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      user: { bulkRemove },
    },
    helpers: {
      permissions: { isAdminOrError },
    },
  } = server.app;

  // define Joi schema
  const schema = Joi.object({
    data: Joi.array()
      .items(Joi.string())
      .required(),
    soft: Joi.boolean().required(),
  });

  return {
    method: "DELETE",
    path: `/user/bulk`,
    config: {
      pre: [
        {
          method: isAdminOrError,
          assign: "user",
        },
      ],
      handler: bulkRemove,
      validate: {
        payload: schema,
      },
    },
  };
};
