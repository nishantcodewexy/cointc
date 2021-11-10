const Joi = require("joi");

module.exports = (server) => {
  const Schema = require("../../../schema/user.schema")(server);
  const { payload: payloadSchema } = Schema.remove();

  const {
    controllers: {
      user: { remove },
    },
    helpers: {
      permissions: { isUser },
    },
  } = server.app;

  return {
    method: "DELETE",
    path: `/user`,
    config: {
      pre: [
        {
          method: isUser,
          assign: "user",
        },
      ],
      handler: remove,
      auth: "jwt",
      validate: {
        payload: payloadSchema,
      },
    },
  };
};
