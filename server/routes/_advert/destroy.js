const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      advert: { destroy },
    },
  } = server.app;

  

  return {
    method: "DELETE",
    path: "/adverts/{id}",
    config: {
      handler: destroy,
      auth: 'jwt'
    },
  };
};
