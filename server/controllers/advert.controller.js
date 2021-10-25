"use strict";
const assert = require("assert");

const AdvertController = (server) => {
  const { db } = server.app;

  return {
    async create(req) {
      const { user } = req.pre.user;
      return db.Advert.create({ ...req.payload, owner: user.id });
    },

    // Delete advert
    async destroy(req) {
      const { id } = req.params;

      return await db.Advert.destroy({
        where: id,
      });
    },

    // retrieve advert
    async get(req) {
      const { id } = req.params;

      return db.Advert.findByPk(id);
    },

    // fetch all adverts
    async getAll(req) {
      return await db.Advert.findAll();
    },
  };
  const AdvertGroupController = (req, h) => {
    console.log("User group controller called!");
  };
};

module.exports = AdvertController;
