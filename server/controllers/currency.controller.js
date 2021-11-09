"use strict";

function CurrencyController(server) {
  const {
    db: { Currency, sequelize },
    helpers: { filters, paginator },
    boom,
  } = server.app;

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
        pre: {
          user: { user },
        },
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

    // UPDATE------------------------------------------------------------
    /**
     * @function updateByID - Updates single currency
     * @param {Object} req
     * @returns
     */
    async updateByID(req) {
      const {
        payload,
        params: { id },
        pre: {
          user: { user, sudo, fake },
        },
      } = req;

      try {
        if (!sudo)
          return boom.methodNotAllowed(
            `Only authorized users can access this route`
          );

        const queryOptions = {
          where: {
            id,
            user_id: user?.id,
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
              id,
              status: Boolean(count),
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
     * @function update - Updates single currency
     * @param {Object} req
     * @returns
     */
    async update(req) {
      const {
        payload: { ids = [], paranoid = true },
        pre: {
          user: { user, sudo },
        },
      } = req;

      if (!sudo)
        return boom.methodNotAllowed(
          `Only authorized users can access this route`
        );

      try {
        return {
          result: await sequelize.transaction(
            async (t) =>
              await Promise.all(
                ids?.map(async ({ id, ...newData }) => {
                  let queryOptions = {
                    where: {
                      id,
                      user_id: user.id,
                    },
                    validate: true,
                    /* returning: ["id", "name", "iso_code", "type", "user_id"], */
                    fields: ["name", "iso_code", "type"],
                    paranoid,
                    // logging: console.log,
                  };
                  return await Currency.update(newData, queryOptions)
                    .then(([count]) => ({
                      status: Boolean(count),
                      id,
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
     * @function removeByID - Removes a currency record by ID
     * @param {Object} req
     * @returns
     */
    async removeByID(req) {
      try {
        const {
          payload: { force = false },
          pre: {
            user: { user, fake, sudo },
          },
          params: { id },
        } = req;
        if (!sudo)
          return boom.methodNotAllowed(
            `Only authorized users can access this route`
          );

        const queryOptions = {
          where: {
            id,
            user_id: user.id,
          },
          force,
        };

        return {
          result: await Currency.destroy(queryOptions)
            .then((count) => ({
              id,
              status: Boolean(count),
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
     * @function remove - Remove Multiple currency record
     * @param {Object} req
     * @returns
     */
    async remove(req) {
      const {
        payload: { ids = [], force = false },
        pre: {
          user: { user, sudo, fake },
        },
      } = req;

      if (!sudo)
        return boom.methodNotAllowed(
          `Only authorized users can access this route`
        );

      try {
        let result = await sequelize.transaction(async (t) =>
          Promise.all(
            ids?.map(async (id) => {
              let queryOptions = {
                where: {
                  id,
                  user_id: user.id,
                },
                transaction: t,
                force,
              };
              return await Currency.destroy(queryOptions).then((result) => ({
                id,
                status: Boolean(result),
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
     * @function findByID - Gets single currency
     * @param {Object} req
     * @returns
     */
    async findByID(req) {
      const {
        query,
        pre: {
          user: { user, fake },
        },
        params: { id },
      } = req;

      try {
        // let where = id ? { id } : null;
        //TODO: Only admins are allowed to see who created the currency
        const queryOptions = {
          where: {
            user_id: user.id,
            id,
          },
        };
        let result = fake
          ? Currency.FAKE()
          : await Currency.findOne(queryOptions).catch((err) => {
              throw boom.badData(err.message, err);
            });

        return result
          ? { result }
          : boom.notFound(`Currency ID: ${id} not found!`);
      } catch (error) {
        console.error(error);
        return boom.boomify(error);
      }
    },

    /**
     * @function find - Get multiple Currencies
     * @param {Object} req
     * @returns
     */
    async find(req) {
      const {
        query,
        pre: {
          user: { user, sudo, fake },
        },
      } = req;

      try {
        const queryFilters = await filters({
          query,
          searchFields: ["name", "iso_code", "type"],
        });

        const queryOptions = {
          ...queryFilters,
          ...(!sudo && { attributes: { exclude: ["user_id"] } }),
          // attributes: [
          //   "id",
          //   "name",
          //   "iso_code",
          //   "type",
          //   "user_id",
          //   "created_at",
          //   "updated_at",
          //   "archived_at",
          // ],
        };

        const { limit, offset } = queryFilters;
        let queryset = fake
          ? await Currency.FAKE(limit)
          : await Currency.findAndCountAll(queryOptions);

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
    /**
     * @function restoreByID - Restore record by ID
     * @param {Object} req
     * @returns
     */
    async restoreByID(req) {
      const {
        params: { id },
        pre: {
          user: { user, sudo, fake },
        },
      } = req;

      try {
        let result = fake
          ? Currency.FAKE()
          : await Currency.restore({
              where: {
                id,
                ...(user?.isAdmin && { user_id: user.id }),
              },
            });

        return {
          status: Boolean(result),
          id,
          message: "restored one record",
        };
      } catch (err) {
        console.error(err);
        return boom.internal(err.message, err);
      }
    },

    /**
     * @function restore - bulk restore currency records
     * @param {Object} req
     */
    async restore(req) {
      const {
        payload: { data = [] },
        pre: {
          user: { user, fake },
        },
      } = req;

      try {
        return {
          result: await sequelize.transaction(async (t) =>
            Promise.all(
              data?.map(async (id) =>
                fake
                  ? { id, status: true }
                  : await Currency.restore({
                      where: {
                        id,
                        ...(user?.isAdmin && { user_id: user.id }),
                        returning: true,
                      },
                    }).then((count) => ({
                      id,
                      status: Boolean(count),
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
