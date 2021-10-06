"use strict";
const assert = require("assert");

module.exports = (server) => {
  const {
    db: { Order },
    boom,
    helpers:{
      filters,
      paginator
    }
  } = server.app;

  const orderController = {
    async create(req) {
      
      const { user } = req.pre.user;
      return Order.create({ ...req.payload, from_user_id: user.id });
    },

    // Delete Order
    async destroy(req) {
      const { id } = req.payload;

      return await Order.destroy({
        where: id,
        force: true,
      });
    },

    // archive
    async archive(req) {
      const { id } = req.payload;

      return await Order.destroy({
        where: id,
      });
    },

    // retrieve Order
    async get(req) {
      const { id } = req.params;

      return Order.findByPk(id);
    },

    // fetch all Orders
    async getAll(req) {
      const {
        query,
        pre:{
          isAdmin
        }
      } = req

      
      if(!isAdmin){
        throw boom.forbidden("unauthorized")
      }
      const filterResults = await filters({query,searchFields:[
        "appeal",
        "remark",
        "status",
      ]})

      const queryset = Order.findAndCountAll(filterResults)

      return await paginator({queryset,limit:filterResults.limit,offset:filterResults.offset})
    },
  };
  
  const orderGroupController = (req, h) => { };
  
  return { ...orderController, group: orderGroupController };
};
