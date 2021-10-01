"use strict";
const assert = require("assert");

module.exports = (server) => {
  const { Advert, User } = server.app.db;

  return {
    async create(req) {
      const { user } = req.pre.user;
      return db.Advert.create({ ...req.payload, owner: user.id });
    },

    // Delete advert
    async destroy(req) {
      const { id } = req.payload;

      return await db.Advert.destroy({
        where: id,
      });
    },

    // retrieve advert
    async get(req) {
      const { ad } = req.payload;

      return db.Advert.findByPk(ad, { include: User });
    },

    // fetch all adverts
    async getAll(req) {
      return await db.Advert.findAll();
    },
  };
};
