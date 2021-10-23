"use strict";
const { Op } = require("sequelize");
const boom = require("@hapi/boom");

module.exports = (server) => {
  const {
    db: { BankDetail, sequelize, Profile },
    consts: { roles: _roles },
    helpers: { filters, paginator },
  } = server.app;
  /* const queryInterface = sequelize.getQueryInterface();
      const table = Currency.getTableName(); */
  return {
    /**
     * @function get - Gets currency collection
     * @param {Object} req
     * @returns
     */
    async retrieve(req) {
      const {
        pre: { user },
        params: { id },
      } = req;

      const queryOptions = {
        where: {
          user_id: user.id,
          attributes: { exclude: ["user_id", "UserId"] },
        },
      };

      try {
        return await BankDetail.findByPk(id, queryOptions);
      } catch (error) {
        console.error(error);
        throw boom.boomify(error);
      }
    },

    async bulkRetrieve(req) {
      const {
        query,
        pre: { user },
      } = req;

      try {
        const filterResults = await filters({
          query,
          searchFields: ["bank_name", "currency", "country"],
        });

        const queryset = await BankDetail.findAndCountAll(filterResults);
        return paginator({
          queryset,
          limit: filterResults.limit,
          offset: filterResults.offset,
        });
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

      const queryOptions = {
        where: {
          user_id: user.id,
          id,
        },
      };

      try {
        return { updated: await BankDetail.update(payload, queryOptions) };
      } catch (error) {
        console.error(error);
        throw boom.boomify(error);
      }
    },

    async create(req) {
      const {
        payload,
        pre: { user },
      } = req;

      const data = { ...payload };

      try {
        return await user.createBankDetail(data);
      } catch (error) {
        console.error(error);
        throw boom.boomify(error);
      }
    },

    async remove(req) {
      try {
        const {
          pre: { user },
          params: { id },
        } = req;

        const queryOptions = {
          where: {
            user_id: user.id,
            id,
          },
        };

        return {
          deleted: await BankDetail.destroy(queryOptions),
        };
      } catch (error) {
        console.error(error);
        return boom.forbidden(error);
      }
    },

    async bulkRemove(req) {
      const {
        pre: { user },
        params: { id },
      } = req;

      try {
        return {
          deleted: await sequelize.transaction(async (t) => {
            return await BankDetail.destroy({
              where: {
                user_id: user.id,
                id,
              },
              transaction: t,
            }).then((affectedRows) => affectedRows);
          }),
        };
      } catch (error) {
        console.error(error);
        return boom.forbidden(error);
      }
    },
  };
};
