"use strict";
const { Op } = require("sequelize");
const bank_detail = require("../database/models/bank_detail");
const boom = require("@hapi/boom");
module.exports = (server) => {
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
        query,
        pre: { isAdmin },
        auth: {
          credentials: { user },
        },
        params: { id },
      } = req;

      try {
        return await BankDetail.findOne({
          where: {
            id,
            archive_at: null,
            ...(!isAdmin ? { user_id: user.id } : {}),
          },
          attributes: { exclude: ["user_id", "archive_at", "UserId"] },
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

      try {
        const filterResults = await filters({
          query,
          searchFields: ["bank_name", "currency", "country"],
          extra: {
            ...(!user
              ? {
                  user_id: user.id,
                }
              : {}),
            archive_at: null,
          },
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

      try {
        return await BankDetail.update(payload, {
          where: {
            user_id: user?.id,
            archive_at: null,
            id,
          },
        });
      } catch (error) {
        console.error(error);
        throw boom.boomify(error);
      }
    },

    async create(req) {
      const {
        payload,
        auth: {
          credentials: { user },
        },
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
          deleted: await sequelize.transaction(async (t) => {
            return await BankDetail.destroy({
              where: {
                user_id: user.id,
                archive_at: null,
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
