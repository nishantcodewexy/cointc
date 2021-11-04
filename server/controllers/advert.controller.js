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
        pre: {
          user: { user, sudo, fake },
        },
      } = req;
      try {
        return {
          result: fake
            ? await Advert.FAKE()
            : await user.createAdvert(payload).catch((err) => {
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
        pre: { user:{user} },
      } = req;

      try {
        let where;
        if (user.isAdmin || user.isSuperAdmin) {
          where = { id };
        } else {
          where = { id, user_id: user.id };
        }

        return { deleted: Boolean(await __destroy("Advert", where, force)) };
      } catch (error) {
        console.error(error);
        throw boom.boomify(error);
      }
    },

    // RETRIEVE ------------------------------------------------
    async findByID(req) {
      const {
        params: { id },
      } = req;

      return { result: await Advert.findByPk(id) };
    },

    /**
     * @function bulkRetrieve - Retrieves multiple advert records
     * @param {Object} req
     */
    async find(req) {
      const {
        query,
        pre: {
          user: { user, fake, fake_count, sudo },
        },
      } = req;

      try {
        const queryFilters = await filters({
          query,
          searchFields: ["user_id"],
        });
        const options = {
          ...queryFilters,
          logging: console.log,
          // include: User,
          // attributes: { include: [["User", "user"]] },
        };

        let queryset = fake
          ? await Advert.FAKE(fake_count)
          : await Advert.findAndCountAll(options).catch((err) => {
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
    /**
     * @function update
     * @param {Object} req
     * @returns
     */
    async update(req) {
      const {
        query,
        pre: {
          user: { user, fake, fake_count, sudo },
        },
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

    /**
     * @function updateByID
     * @param {Object} req
     * @returns
     */
    async updateByID(req) {
      const {
        query,
        pre: {
          user: { user, fake, fake_count, sudo },
        },
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
