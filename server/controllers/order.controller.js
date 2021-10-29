"use strict";
const boom = require("@hapi/boom");

function OrderController(server) {
  const {   __destroy } = require("./utils")(
    server
  );
  const {
    db: { Order, Advert },
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
        pre: { user },
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
            result: await user.createOrder({
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
     * @function remove - remove a single record
     * @param {Object} req
     * @returns
     */
    async remove(req) {
      const {
        params: { id },
        payload: { force = false },
        pre: { user },
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
     * @function retrieve
     * @param {Object} req
     * @returns
     */
    async retrieve(req) {
      const { id } = req.params;
      try {
        return { result: await Order.findByPk(id) };
      } catch (error) {
        console.error(error);
        throw boom.internal(error.message, error);
      }
    },

    /**
     * @function bulkRetrieve
     * @param {Object} req
     * @returns
     */
    async bulkRetrieve(req) {
      const {
        query,
        pre: { user },
      } = req;

      try {
        const queryFilters = await filters({
          query,
          searchFields: ["appeal", "remark", "status"],
        });
        const options = {
          ...queryFilters,
        };
        const queryset = await Order.findAndCountAll(options);
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
  };
}

module.exports = OrderController;
