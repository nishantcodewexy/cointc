const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      advert: { get },
    },
  } = server.app;

  return {
    method: "GET",
    path: "/ads/{id}",
    config: {
      handler: get,
      auth: "jwt",
    },
  };
};
