"use strict";
const boom = require("@hapi/boom");

function OrderController(server) {
  const { __destroy } = require("./utils")(server);
  const {
    db: { Order, Advert, Kyc },
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

      // Check if user's KYC has been approved first
      let approvedKyc = Kyc.findOne({
        where: {
          user_id: user?.id,
          status: "ACCEPT",
        },
      });

      if (!approvedKyc)
        return boom.methodNotAllowed(`Please complete KYC in order to proceed`);
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
        query,
        params: { id },
        /* pre: {
          user: { user, fake },
        }, */
      } = req;
      try {
        const { fake } = query;
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
      const { query } = req;

      try {
        const { fake } = query;
        const queryFilters = await filters({
          query,
          searchFields: ["user_id"],
        });

        const options = {
          ...queryFilters,
        };
        const { limit, offset } = queryFilters;

        const queryset = fake
          ? await Order.FAKE(limit)
          : await Order.findAndCountAll(options);

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
          user: { user, sudo },
        },
      } = req;

      try {
        let fields = sudo
            ? ["status"]
            : ["status", "rating", "trx_id", "appeal", "remark"],
          result,
          where = {
            id,
            ...(!sudo && { user_id: user?.id }),
          };

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

    async confirmOrder(req) {
      const {
        pre: {
          user: { user, sudo },
        },
      } = req;

      try {
      } catch (error) {
        console.error(error);
        return boom.internal(error.message, error);
      }
    },
  };
}

module.exports = OrderController;
