"use strict";

module.exports = (server) => {
  const {
    controllers: {
      advert: { bulkRetrieve },
    },
  } = server.app;

  return {
    method: "GET",
    path: "/ad/bulk",
    config: {
      handler: bulkRetrieve,
      auth: "jwt",
    },
  };
};
