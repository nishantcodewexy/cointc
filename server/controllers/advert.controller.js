"use strict";

const AdvertController = (server) => {
  const {
    db: { Advert, User, sequelize },
    boom,
    helpers: { filters, paginator },
  } = server.app;

  async function completionRate(total_orders, total_completed_orders) {
    return (total_completed_orders / total_orders) * 100;
  }

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
      const { id } = req.params;

      return await Advert.destroy({
        where: id,
      });
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
      const { query } = req;
      const queryFilters = await filters({ query, searchFields: ["user_id"] });
      const options = {
        ...queryFilters,
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
