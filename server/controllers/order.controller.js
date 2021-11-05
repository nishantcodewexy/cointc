"use strict";
const boom = require("@hapi/boom");

function OrderController(server) {
  const { __destroy } = require("./utils")(server);
  const {
    db: { Order, Advert, User },
    helpers: { filters, paginator },
  } = server.app;

  return {
    // CREATE ---------------------------------------------------------

    /**
     * @function create - create single order record
     * @param {Object} req
     * @returns
     */
    async create(req) {
      const {
        pre: {
          user: { user, fake },
        },
        payload,
      } = req;

      const { advert_id } = payload;
      if (!advert_id) throw boom.badRequest("Missing advert_id in request");

      try {
        // find advert
        let ad = await Advert.findByPk(advert_id);
        if (ad) {
          // create order using the user info
          return {
            result: fake
              ? await Order.FAKE()
              : await user.createOrder({
                  ...payload,
                }),
          };
        } else
          return boom.notFound(
            "Advert cannot be found! Cannot create order for non-existent ad"
          );
      } catch (error) {
        console.error(error);
        throw boom.internal(error.message, error);
      }
    },
    // REMOVE ---------------------------------------------------------

    /**
     * @function removeByID - remove a single record
     * @param {Object} req
     * @returns
     */
    async removeByID(req) {
      const {
        params: { id },
        payload: { force = false },
        pre: {
          user: {
            user: { user, sudo },
          },
        },
      } = req;

      try {
        let where = { id };
        return { deleted: Boolean(await __destroy("Order", where, force)) };
      } catch (error) {
        console.error(error);
        throw boom.boomify(error);
      }
    },

    // RETRIEVE ---------------------------------------------------------
    /**
     * @function findByID
     * @param {Object} req
     * @returns
     */
    async findByID(req) {
      const {
        params: { id },
        pre: {
          user: { user, fake },
        },
      } = req;
      try {
        let result = fake ? await Order.FAKE() : await Order.findByPk(id);
        return { result };
      } catch (error) {
        console.error(error);
        throw boom.internal(error.message, error);
      }
    },

    /**
     * @function find
     * @param {Object} req
     * @returns
     */
    async find(req) {
      const {
        query,
        pre: {
          user: { user, fake, fake_count },
        },
      } = req;

      try {
        const queryFilters = await filters({
          query,
          searchFields: ["appeal", "remark", "status"],
        });

        const options = {
          ...queryFilters,
          // include: [{ model: Advert }, User],
        };

        const queryset = fake
          ? await Order.FAKE(fake_count)
          : await Order.findAndCountAll(options);
        const { limit, offset } = queryFilters;
        return await paginator({
          queryset,
          limit,
          offset,
        });
      } catch (error) {
        console.error(error);
        throw boom.boomify(error);
      }
    },

    /**
     * @function updateByID
     * @param {Object} req
     * @returns
     */
    async updateByID(req) {
      const {
        params: { id },
        payload,
        pre: {
          user: { user, sudo, fake, fake_count },
        },
      } = req;

      try {
        let fields = ["status", "rating", "trx_id", "appeal", "remark"],
          result,
          where = {
            id,
            ...(!sudo && { user_id: user?.id }),
          };

          const {status} = payload
          
        
        result = await Order.update(payload, {
          where,
          fields,
          returning: true,
        }).then(([count]) => count);

        return {
          id,
          status: Boolean(result),
        };
      } catch (error) {
        console.error(error);
        throw boom.boomify(error);
      }
    },
  };
}

module.exports = OrderController;
