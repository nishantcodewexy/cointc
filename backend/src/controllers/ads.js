const assert = require("assert");

module.exports = (server) => {
  const {
    db,
    boom,
    helpers: { sendMail, decrypt, createToken },
  } = server.app;

  return {
    async create(req, h) {
      return db.create({ ...req.payload });
    },

    // Delete advert
    async delete(req, h) {
      const { id } = req.payload;
    
      return await ad.destroy({
        where: id
      });
    },

    // retrieve advert
    async get(req, h) {
      const { ad } = req.payload;

      return db.Ads.findByPk(ad);
    },

    // fetch all adverts
    async getAll(req, h) {
      return await db.Ads.findAll();
    },
  };
};
