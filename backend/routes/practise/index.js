const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      practise: { create },
    },
      helpers: { jwt: {decodeUser} }
  } = server.app;

  const schema = Joi.object({
    ad: Joi.string().required(),
  });

  return {
    method: ["POST"],
    path: "/practise",
    config: {
      // pre-handler
    //   pre: [
    //     [
          // To be executed in parallel
        //   {
        //     method: decodeUser,
        //     assign: "user",
        //   },
        //   {
        //     method: (req, h) => {
        //       const { ad } = req.params;
        //       return ad ? get : getAll;
        //     },
        //     assign: "fetch",
        //   },
        // ],
    //   ],
      handler: create,
      validate: {
        //   payload to validate req.payload
        //   query to validate req.query
        //   params to validate req.params
        payload: schema,
      },
    //   auth: 'jwt'
    },
  };
};
