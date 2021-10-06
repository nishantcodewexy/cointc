const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      advert: { getAll },
    },
  } = server.app;

  

  return {
    method: "GET",
    path: "/adverts",
    config: {
      handler: getAll,
      auth: 'jwt'
    },
  };
};
