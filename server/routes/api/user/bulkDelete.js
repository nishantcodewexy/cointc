const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      user: { 
          group:{remove}
       },
    },
    helpers:{
        permissions:{
         isAdminOrError
        }
    },
    consts: { patterns, roles: _roles },
  } = server.app;

  // define Joi schema
  const schema = Joi.object({
    data: Joi.array().items(Joi.string()).required(),
    soft: Joi.boolean().required(),
    
  })

  return {
    method: "DELETE",
    path: `/users`,
    config: {
      pre: [
        {
          method: () => _roles.admin,
          assign: "role",
        },
        {
          method: () => isAdminOrError,
          assign: "isAdminOrError",
        },
      ],
      handler: remove,
      validate: {
        payload: schema,
      },
    },
  };
};
