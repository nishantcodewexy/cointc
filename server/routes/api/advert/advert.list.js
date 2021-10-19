const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      advert: { list },
    },
    helpers:{
      isAdmin
    }
  } = server.app;

  

  return {
    method: "GET",
    path: "/adverts",
    config: {
      handler: list,
      auth: 'jwt'
    },
  };
};
