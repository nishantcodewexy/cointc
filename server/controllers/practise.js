"use strict";
const assert = require("assert");

module.exports = (server) => {
  const {
    db: { Order },
  } = server.app;

  return {
    async create(req) {
      const { user } = req.pre.user;
      return Order.create({ ...req.payload, from_user_id: user.id });
    },

    // Delete Order
    // async destroy(req) {
    //   const { id } = req.payload;

    //   return await Order.destroy({
    //     where: id,
    //     force: true,
    //   });
    // },

    // archive
    async archive(req) {
      const { id } = req.payload;

      return await Order.destroy({
        where: id,
      });
    },

    // retrieve Order
    async get(req) {
      const { id } = req.payload;

      return Order.findByPk(id);
    },

   
  };
};
