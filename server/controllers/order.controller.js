"use strict";
const assert = require("assert");
const boom = require("@hapi/boom");

function OrderController(server) {
  const {
    db: { Order },
    helpers: { filters, paginator },
  } = server.app;

  return {
    async create(req) {
      const {
        auth: {
          credentials: { user },
        },
      } = req;

      try {
        return Order.create({
          ...req.payload,
          from_user_id: user.dataValues.id,
        });
      } catch (error) {
        console.error(error);
        throw boom.boomify(error);
      }
    },

    // Delete Order
    async destroy(req) {
      const { id } = req.params;
      try {
        return await Order.destroy({
          where: id,
          force: true,
        });
      } catch (error) {
        console.error(error);
        throw boom.boomify(error);
      }
    },

    // archive
    async archive(req) {
      const { id } = req.payload;
      try {
        return await Order.destroy({
          where: id,
        });
      } catch (error) {
        console.error(error);
        throw boom.boomify(error);
      }
    },

    // retrieve Order
    async retrieve(req) {
      const { id } = req.params;
      try {
        return Order.findByPk(id);
      } catch (error) {
        console.error(error);
        throw boom.boomify(error);
      }
    },

    // fetch all Orders
    async list(req) {
      const {
        query,
        pre: { isAdmin },
      } = req;

      // if(!isAdmin){
      //   throw boom.forbidden("unauthorized")
      // }

      try {
        const filterResults = await filters({
          query,
          searchFields: ["appeal", "remark", "status"],
        });

        const queryset = Order.findAndCountAll(filterResults);

        return await paginator({
          queryset,
          limit: filterResults.limit,
          offset: filterResults.offset,
        });
      } catch (error) {
        console.error(error);
        throw boom.boomify(error);
      }
    },
  };
}

module.exports = OrderController;
