"use strict";

module.exports = (server) => {
  const {
    db: { Currency, sequelize },
    consts: { roles: _roles },
    boom,
  } = server.app;
  /* const queryInterface = sequelize.getQueryInterface();
      const table = Currency.getTableName(); */
  const CurrencyGroupController = {
    /**
     * @function create - Creates currency (**Admin only**)
     * @param {Object} req - Request object
     * @param {Object} req.payload
     * @param {Array} req.payload.data
     * @returns
     */
    create: async (req) => {
      const {
        payload: { data },
        pre: { user },
      } = req;

      Currency.beforeBulkCreate((currencies, options) => {
        for (const currency of currencies) {
          currency.created_by = user.id;
        }
        return currencies;
      });

      try {
        return await sequelize.transaction(
          async (t) =>
            await Currency.bulkCreate(data, {
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

    async get(req) {
      try {
        let { id } = req.query;
        let where = id ? { id } : null;
        return await Currency.findAndCountAll({ where });
      } catch (error) {
        console.error(error);
        return boom.boomify(error);
      }
    },

    async destroy(req) {
      const {
        payload: { data, force = false },
        pre: { user },
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
    async update(req) {
      const {
        payload: { data },
        pre: { user },
      } = req;

      try {
        return await sequelize.transaction(async (t) => {
          return Promise.all(
            data.map(
              async ({ id, ...row }) =>
                await Currency.update(
                  { ...row },
                  {
                    where: { id, created_by: user.id },
                    transaction: t,
                    validate: true,
                    returning: ["id", "name", "iso_code", "type", "created_by"],
                    fields: ["name", "iso_code", "type"],
                    logging: console.log,
                  }
                ).then(([count, affectedRows]) => affectedRows[0])
            )
          )
        });
      } catch (error) {
        console.error(error);
        return boom.forbidden(error);
      }
    },
  };
  return {
    group: CurrencyGroupController,
  };
};
