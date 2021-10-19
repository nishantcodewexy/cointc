const Joi = require("joi");
const {
    handleValidation,
    permissions:{
        isUser
    }
} = require("../../../helpers")

module.exports = (server) => {

  const {
    controllers: {
      advert: { bulkUpdate },
    },
    // import helper direct to get autocomplete features
    
  } = server.app;

  const schema = Joi.array().items(Joi.object({
    id:Joi.string().uuid().required(),
    remarks:Joi.string().required()
  }))

  return {
    method: ["PATCH","PUT"],
    path: "/adverts",
    config: {
        pre:[
            {
                method:handleValidation(schema),
                assign:"dataset"
            },
            {
                method:isUser,
                assign:"user"
            }
        ],
      handler: bulkUpdate,
      auth: 'jwt'
    },
  };
};
