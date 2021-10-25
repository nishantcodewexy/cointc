"use strict";
const assert = require("assert");

const AdvertController = (server) => {
  const { db } = server.app;

  return {
    async create(req) {
      const { user } = req.pre.user;
      return db.Advert.create({ ...req.payload, owner: user.id });
    },

    // REMOVE ---------------------------------------
    async remove(req) {
      const { id } = req.params;

      return await db.Advert.destroy({
        where: id,
      });
    },

    // RETRIEVE ------------------------------------------------
    async retrieve(req) {
      const { id } = req.params;

      return db.Advert.findByPk(id);
    },

    // fetch all adverts
    async bulkRetrieve(req) {
      return await db.Advert.findAll();
    },
  };
};

module.exports = AdvertController;
