const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      advert: { retrieve },
    },
  } = server.app;

  

  return {
    method: "GET",
    path: "/adverts/{id}",
    config: {
      handler: retrieve,
      auth: 'jwt'
    },
  };
};
