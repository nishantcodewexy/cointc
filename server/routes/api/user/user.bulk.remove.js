const Joi = require("joi");

module.exports = (server) => {
  const Schema = require("../../../schema/user.schema");
  const { payload: payloadSchema } = Schema.bulkRemove(server);

  const {
    controllers: {
      user: { bulkRemove },
    },
    helpers: {
      permissions: { isAdminOrError },
    },
  } = server.app;

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
      auth: "jwt",
      validate: {
        payload: payloadSchema,
      },
    },
  };
};
