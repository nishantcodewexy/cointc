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
      advert: { update },
    },
    // import helper direct to get autocomplete features
    // helpers:{
    //   isAdmin,
    //   validateSchema
    // }
  } = server.app;

  const schema = Joi.object({
    remarks:Joi.string().required()
  })

  return {
    method: ["PATCH","PUT"],
    path: "/adverts/{id}",
    config: {
        pre:[
            {
                method:handleValidation(schema),
                assign:"data"
            },
            {
                method:isUser,
                assign:"user"
            }
        ],
      handler: update,
      auth: 'jwt'
    },
  };
};
