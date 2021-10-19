const Joi = require("joi");
const {
  permissions:{
    isUser
  },
  handleValidation
} = require("../../../helpers")
module.exports = (server) => {
  const {
    controllers: {
      advert: { bulkDelete },
    },
  } = server.app;

  let schema = Joi.object({
    data:Joi.array().items(Joi.object({
      id:Joi.string().uuid().required()
    })),
    soft:Joi.boolean().default(true).optional()
  })
  

  return {
    method: "DELETE",
    path: "/adverts",
    config: {
      pre:[
        {
          method:isUser,
          assign:"user"
        },
        {
          method:handleValidation(schema),
          assign:"dataset"
        },
      ],
      handler: bulkDelete,
      auth: 'jwt'
    },
  };
};
