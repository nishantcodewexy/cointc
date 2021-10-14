"use strict";
const { Op } = require("sequelize");
const bank_detail = require("../database/models/bank_detail");
const boom = require("@hapi/boom");
module.exports = (server) => {
  const {__findAllWithPagination,__update,__destroy} = require("./_methods")(server)
  const {
    db: { BankDetail, sequelize },
    consts: { roles: _roles },
    helpers: { filters, paginator },
  } = server.app;
  /* const queryInterface = sequelize.getQueryInterface();
      const table = Currency.getTableName(); */
  const BankDetailController = {
    /**
     * @function get - Gets currency collection
     * @param {Object} req
     * @returns
     */
    async retrieve(req) {
      const {
        params: { id },
      } = req;

      try {
        return await BankDetail.findOne({
          where: {
            id,
          },
          attributes: { exclude: ["archive_at", "UserId"] }
        });
      } catch (error) {
        console.error(error);
        throw boom.boomify(error);
      }
    },
    async list(req) {
      const {
        query,
        pre: { user },
      } = req;

      

      let paranoid = Boolean(query.paranoid) || false
      delete query.paranoid

      let where,searchFields,options
      where = {}
      searchFields = ["bank_name", "currency", "country"]
      options = user.isAdmin?{paranoid}:{}

      try {

        return await __findAllWithPagination("BankDetail",query,where,searchFields,options)
        
      } catch (error) {
        console.error(error);
        throw boom.boomify(error);
      }
    },

    async update(req) {
      const {
        pre: { user },
        payload,
        params: { id },
      } = req;

      try {
        let where = {
          id
        }
        return await __update("BankDetail",payload,where,{})
      } catch (error) {
        console.error(error);
        throw boom.boomify(error);
      }
    },

    async create(req) {
      const {
        payload,
        pre:{
          user
        }
      } = req;
      try {
        return await BankDetail.create({ ...payload, user_id: user.id });
      } catch (error) {
        console.error(error);
        throw boom.boomify(error);
      }
    },

    async destroy(req) {
      const {
        pre: { user },
        params: { id },
      } = req;

      try {
        return {
          deleted: await sequelize.transaction(async (transaction) => {
            let where = {id}
            let options = {transaction}
            return await __destroy("BankDetail",where,false,options)
            
          }),
        };
      } catch (error) {
        console.error(error);
        return boom.forbidden(error);
      }
    },

    // async bulkDelete(req) {

    // },
    // async bulkCreate(req) {

    // },
  };
  const BankDetailGroupController = {};

  return {
    ...BankDetailController,
    group: BankDetailGroupController,
  };
};
