"use strict";
const uuid = require("uuid");

function CurrencyController(server) {
  const {
    db: { Currency, sequelize, User },
    consts: { roles: _roles },
    helpers: { filters, paginator },
    boom,
  } = server.app;
  /* const queryInterface = sequelize.getQueryInterface();
      const table = Currency.getTableName(); */

  return {
    // CREATE------------------------------------------------------------
    /**
     * @function create - Create single currency (**Admin only**)
     * @param {Object} req - Request object
     * @param {Object} req.payload
     * @returns
     */
    async create(req) {
      const {
        payload,
        pre: { user },
      } = req;

      const queryOptions = {
        validate: true,
        fields: ["id", "type", "iso_code", "name", "created_by"],
        returning: ["id", "type", "iso_code", "name"],
      };

      try {
        return {
          result: await user
            .createCurrency(payload, queryOptions)
            .catch((err) => {
              throw boom.badData(err.message, err);
            }),
        };
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
    async bulkCreate(req) {
      const {
        payload: { data = [] },
        pre: { user },
      } = req;

      try {
        return {
          result: await sequelize
            .transaction(async (t) => {
              return await Promise.all(
                data.map(async (currency_data) => {
                  const queryOptions = {
                    transaction: t,
                    validate: true,
                    fields: ["id", "type", "iso_code", "name"],
                    returning: ["id", "type", "iso_code", "name"],
                  };

                  return await user.createCurrency(currency_data, queryOptions);
                })
              );
            })
            .catch((err) => {
              throw boom.badData(err.message, err);
            }),
        };
      } catch (thrown) {
        console.error(thrown.message, thrown);
        if (boom.isBoom) return thrown;
        return boom.internal(thrown.message, thrown);
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
        const queryOptions = {
          where: {
            id,
            ...(() => (user?.isAdmin ? { user_id: user.id } : {}))(),
          },
          validate: true,
          returning: true,
          fields: ["name", "iso_code", "type"],
          // logging: console.log,
        };

        return {
          result: await user
            .updateCurrency(payload, queryOptions)
            .then(([count, [updated]]) => ({
              updated,
              [id]: Boolean(count),
            }))
            .catch((err) => {
              throw boom.badData(err.message, err);
            }),
        };
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
        payload: { data = [], paranoid = true },
        pre: { user },
      } = req;

      try {
        return {
          result: await sequelize.transaction(
            async (t) =>
              await Promise.all(
                data?.map(async ({ id, ...newData }) => {
                  let queryOptions = {
                    where: {
                      id,
                      ...(() => (user?.isAdmin ? { user_id: user.id } : {}))(),
                    },
                    validate: true,
                    /* returning: ["id", "name", "iso_code", "type", "user_id"], */
                    fields: ["name", "iso_code", "type"],
                    paranoid,
                    // logging: console.log,
                  };
                  return await Currency.update(newData, queryOptions)
                    .then(([count]) => ({
                      [id]: Boolean(count),
                      ...(() =>
                        !count
                          ? { extra: `Record might have been deleted` }
                          : null)(),
                    }))
                    .catch((err) => {
                      throw boom.badData(err.message, err);
                    });
                })
              )
          ),
        };
      } catch (thrown) {
        console.error(thrown.message, thrown);
        if (boom.isBoom) return thrown;
        return boom.internal(thrown.message, thrown);
      }
    },

    // REMOVE------------------------------------------------------------
    /**
     * @function remove - Removes a single currency record
     * @param {Object} req
     * @returns
     */
    async remove(req) {
      try {
        const {
          payload: { force = false },
          pre: { user },
          params: { id },
        } = req;

        const queryOptions = {
          where: {
            id,
            ...(() => (user?.isAdmin ? { user_id: user.id } : {}))(),
          },
          force,
        };

        return {
          result: await Currency.destroy(queryOptions)
            .then((count) => ({
              [id]: Boolean(count),
              ...(() =>
                !count
                  ? {
                      info:
                        "Record may not exist anymore or is soft deleted. Use the force option to permanently delete record",
                    }
                  : null)(),
            }))
            .catch((err) => {
              throw boom.badData(err.message, err);
            }),
        };
      } catch (error) {
        console.error(error);
        return boom.boomify(error);
      }
    },
    /**
     * @function bulkRemove - Remove Multiple currency record
     * @param {Object} req
     * @returns
     */
    async bulkRemove(req) {
      const {
        payload: { data = [], force = false },
        pre: { user },
      } = req;
      let total = 0;
      // user.removeCurrencies

      try {
        let result = await sequelize.transaction(async (t) =>
          Promise.all(
            data?.map(async (id) => {
              let queryOptions = {
                where: {
                  id,
                  ...(() => (user?.isAdmin ? { user_id: user.id } : {}))(),
                },
                transaction: t,
                force,
              };
              return await Currency.destroy(queryOptions).then((count) => ({
                [id]: ((total += count), Boolean(count)),
                ...(() =>
                  !count
                    ? {
                        info:
                          "Record may not exist anymore or is soft deleted. Use the force option to permanently delete record",
                      }
                    : null)(),
              }));
            })
          ).catch((err) => {
            throw boom.badData(err.message, err);
          })
        );
        return {
          total,
          result,
        };
      } catch (error) {
        console.error(error);
        return boom.internal(error.message, error);
      }
    },

    // RETRIEVE------------------------------------------------------------

    /**
     * @function get - Gets single currency
     * @param {Object} req
     * @returns
     */
    async retrieve(req) {
      try {
        const {
          query,
          pre: { user },
          params: { id },
        } = req;
        // let where = id ? { id } : null;
        //TODO: Only admins are allowed to see who created the currency
        const queryOptions = {
          where: {
            user_id: user.id,
            id,
          },
        };
        let result = await Currency.findOne(queryOptions).catch((err) => {
          throw boom.badData(err.message, err);
        });

        return result ? { result } : boom.notFound("Record not found");
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
      let { query } = req;

      try {
        const queryFilters = await filters({
          query,
          searchFields: ["name", "iso_code", "type"],
        });

        const queryOptions = {
          ...queryFilters,
          attributes: [
            "id",
            "name",
            "iso_code",
            "type",
            "user_id",
            "created_at",
            "updated_at",
            "archived_at",
          ],
        };

        let queryset = await Currency.findAndCountAll(queryOptions);
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

    // RESTORE------------------------------------------------------------

    async restore(req) {
      const {
        params: { id },
        pre: { user },
      } = req;

      try {
        return {
          result: await Currency.restore({
            where: {
              id,
              ...(() => (user?.isAdmin ? { user_id: user.id } : {}))(),
            },
          })
            .then((count) => ({
              [id]: Boolean(count),
            }))
            .catch((err) => {
              throw boom.badData(err.message, err);
            }),
        };
      } catch (err) {
        console.error(err);
        return boom.internal(err.message, err);
      }
    },

    /**
     * @function bulkRestore - bulk restore currency records
     * @param {Object} req
     */
    async bulkRestore(req) {
      const {
        payload: { data = [] },
        pre: { user },
      } = req;

      try {
        return {
          result: await sequelize.transaction(async (t) =>
            Promise.all(
              data?.map(
                async (id) =>
                  await Currency.restore({
                    where: {
                      id,
                      ...(() => (user?.isAdmin ? { user_id: user.id } : {}))(),
                    },
                  }).then((count) => ({
                    [id]: Boolean(count),
                  }))
              )
            ).catch((err) => {
              throw boom.badData(err.message, err);
            })
          ),
        };
      } catch (err) {
        console.error(err);
        return boom.internal(err.message, err);
      }
    },
  };
}

module.exports = CurrencyController;
