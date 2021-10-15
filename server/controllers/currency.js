"use strict";
const uuid = require("uuid");
module.exports = (server) => {
  const {
    db: { Currency, sequelize },
    consts: { roles: _roles },
    helpers: { filters, paginator },
    boom,
  } = server.app;
  /* const queryInterface = sequelize.getQueryInterface();
      const table = Currency.getTableName(); */

  const CurrencyController = {
    // CREATE------------------------------------------------------------
    /**
     * @function create - Create single currency (**Admin only**)
     * @param {Object} req - Request object
     * @param {Object} req.payload
     * @returns
     */
    create: async (req) => {
      const {
        payload,
        pre: { user },
      } = req;
      /*  Currency.beforeCreate((currency, options) => {
        currency.created_by = user.id;
        currency.id = uuid.v4();
        return currency;
      });
 */
      try {
        return await Currency.create(
          { ...payload, created_by: user.id },
          {
            validate: true,
            fields: ["id", "type", "iso_code", "name", "created_by"],
            returning: ["id", "type", "iso_code", "name"],
          }
        );
      } catch (error) {
        console.error(error);
        return boom.boomify(error);
      }
    },

    /**
     * @function bulkCreate - Bulk create currency (**Admin only**)
     * @param {Object} req - Request object
     * @param {Object} req.payload
     * @param {Array} req.payload.data
     * @returns
     */
    bulkCreate: async (req) => {
      const {
        payload,

        auth: {
          credentials: { user },
        },
      } = req;

      Currency.beforeBulkCreate((currencies = [], options) => {
        for (const currency of currencies) {
          currency.created_by = user.id;
          currency.id = uuid.v4();
        }
        return currencies;
      });

      try {
        return await sequelize.transaction(
          async (t) =>
            await Currency.bulkCreate(payload, {
              transaction: t,
              validate: true,
              fields: ["id", "type", "iso_code", "name", "created_by"],
              returning: ["id", "type", "iso_code", "name"],
            })
        );
      } catch (error) {
        console.error(error);
        return boom.boomify(error);
      }
    },

    // UPDATE------------------------------------------------------------
    /**
     * @function update - Updates single currency
     * @param {Object} req
     * @returns
     */
    async update(req) {
      const {
        payload,
        params: { id },
        pre: { user },
      } = req;

      try {
        const { restore, ...data } = payload;
        return await Currency.update(data, {
          where: { id, created_by: user.id },
          validate: true,
          returning: ["id", "name", "iso_code", "type", "created_by"],
          fields: ["name", "iso_code", "type"],
          // logging: console.log,
        }).then(async ([count, affectedRows]) => {
          restore &&
            (await Currency.restore({
              where: { id, created_by: user.id },
            }));
          return affectedRows[0];
        });
      } catch (error) {
        console.error(error);
        return boom.forbidden(error);
      }
    },
    /**
     * @function bulkUpdate - Updates single currency
     * @param {Object} req
     * @returns
     */
    async bulkUpdate(req) {
      const {
        payload,
        pre: { user },
      } = req;

      try {
        return await sequelize.transaction(async (t) => {
          return Promise.all(
            payload.map(
              async ({ id, restore, ...row }) =>
                await Currency.update(
                  { ...row },
                  {
                    where: { id, created_by: user.id },
                    transaction: t,
                    validate: true,
                    returning: ["id", "name", "iso_code", "type", "created_by"],
                    fields: ["name", "iso_code", "type"],
                    // logging: console.log,
                  }
                ).then(async ([count, affectedRows]) => {
                  restore &&
                    (await Currency.restore({
                      where: { id, created_by: user.id },
                    }));
                  return affectedRows[0];
                })
            )
          );
        });
      } catch (error) {
        console.error(error);
        return boom.forbidden(error);
      }
    },

    // DELETE------------------------------------------------------------
    /**
     * @function remove - Destroy single currency record
     * @param {Object} req
     * @returns
     */
    async remove(req) {
      const {
        payload: { force = false },
        pre: { user },
        params: { id },
      } = req;

      try {
        return {
          deleted: await Currency.destroy({
            where: { id, created_by: user.id },
            force,
          }).then((affectedRows) => affectedRows),
        };
      } catch (error) {
        console.error(error);
        return boom.forbidden(error);
      }
    },
    /**
     * @function bulkRemove - Remove Multiple currency record
     * @param {Object} req
     * @returns
     */
    async bulkRemove(req) {
      const {
        payload: { data, force = false },
        auth: {
          credentials: { user },
        },
      } = req;

      try {
        return {
          deleted: await sequelize.transaction(async (t) => {
            return await Currency.destroy({
              where: { id: data, created_by: user.id },
              transaction: t,
              force,
            }).then((affectedRows) => affectedRows);
          }),
        };
      } catch (error) {
        console.error(error);
        return boom.forbidden(error);
      }
    },

    // LIST------------------------------------------------------------

    /**
     * @function get - Gets single currency
     * @param {Object} req
     * @returns
     */
    async retrieve(req) {
      try {
        let {
          query,
          pre: { user },
        } = req;
        // let where = id ? { id } : null;
        //TODO: Only admins are allowed to see who created the currency
        const filterResult = await filters({
          query,
          searchFields: ["name", "iso_code", "type"],
        });
        let queryset = Currency.findAndCountAll(filterResult);
        return paginator({
          queryset,
          limit: filterResult,
          offset: filterResult.offset,
        });
      } catch (error) {
        console.error(error);
        return boom.boomify(error);
      }
    },

    /**
     * @function bulkList - Get multiple Currencies (**Only Admins**)
     * @param {Object} req
     * @returns
     */
    async bulkRetrieve(req) {
      try {
        let { query } = req;
        const queryFilters = await filters({
          query,
          searchFields: ["name", "iso_code", "type"],
        });

        const options = {
          ...queryFilters,
          attributes: [
            "id",
            "name",
            "iso_code",
            "type",
            "created_at",
            "updated_at",
            "archived_at",
          ],
        };
        let queryset = await Currency.findAndCountAll({});
        const { limit, offset } = queryFilters;

        return paginator({
          queryset,
          limit,
          offset,
        });
      } catch (error) {
        console.error(error);
        return boom.boomify(error);
      }
    },
  };

  return CurrencyController;
};
