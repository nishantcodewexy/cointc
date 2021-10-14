const Joi = require("joi");
const {
  permissions:{
    isUser
  }
} = require("../../../helpers")
module.exports = (server) => {
  const {
    controllers: {
      advert: { destroy },
    },
  } = server.app;

  schema = Joi.object({
    force:Joi.boolean().default(false).optional(),
    options:Joi.object().optional()
  })

  return {
    method: "DELETE",
    path: "/adverts/{id}",
    config: {
      pre:[
        {
          method:isUser,
          assign:"user"
        }
      ],
      handler: destroy,
      auth: 'jwt',
      validate:{
        query:schema
      }
    },
  };
};
