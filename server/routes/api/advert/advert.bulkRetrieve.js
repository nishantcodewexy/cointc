const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      advert: { bulkRetrieve },
    },
  } = server.app;

  

  return {
    method: "GET",
    path: "/ads",
    config: {
      handler: bulkRetrieve,
      auth: 'jwt'
    },
  };
};
