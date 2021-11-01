"use strict";

const AdvertController = (server) => {
  const { __destroy } = require("./utils")(server);
  const {
    db: {
      Advert,
      User,
      Sequelize: { Op },
    },
    boom,
    helpers: { filters, paginator },
  } = server.app;

  return {
    /**
     * @function create - Creates a single advert
     * @param {Object} req
     * @returns
     */
    async create(req) {
      const {
        payload,
        pre: { user },
      } = req;
      try {
        return {
          result: await user.createAdvert(payload).catch((err) => {
            console.error(err);
            throw boom.badData(err.message, err);
          }),
        };
      } catch (err) {
        console.error(err);
        return boom.internal(err.message, err);
      }
    },

    // REMOVE ---------------------------------------
    async remove(req) {
      const {
        params: { id },
        payload: { force = false },
      } = req;

      try {
        let where = { id };
        return { deleted: Boolean(await __destroy("Advert", where, force)) };
      } catch (error) {
        console.error(error);
        throw boom.boomify(error);
      }
    },

    // RETRIEVE ------------------------------------------------
    async retrieve(req) {
      const {
        params: { id },
      } = req;

      return { result: await Advert.findByPk(id) };
    },

    /**
     * @function bulkRetrieve - Retrieves multiple advert records
     * @param {Object} req
     */
    async bulkRetrieve(req) {
      const {
        query,
        pre: { user },
      } = req;
      const queryFilters = await filters({
        query,
        searchFields: ["user_id"],
       /*  extras: {
          user_id: { [Op?.ne]: user?.id },
        }, */
      });
      const options = {
        ...queryFilters,
        logging: console.log,
        include: User,
      };

      try {
        let queryset = await Advert.findAndCountAll(options).catch((err) => {
          throw boom.badData(err.message, err);
        });
        const { limit, offset } = queryFilters;

        return paginator({
          queryset,
          limit,
          offset,
        });
      } catch (err) {
        console.error(err);
        return boom.isBoom ? err : boom.internal(err.message, err);
      }
    },
  };
};

module.exports = AdvertController;
