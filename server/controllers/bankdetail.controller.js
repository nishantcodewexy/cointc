"use strict";

const BankDetailController = (server) => {
  const {
    db: { BankDetail, sequelize },
    boom,
    helpers: { filters, paginator },
  } = server.app;
  /* const queryInterface = sequelize.getQueryInterface();
      const table = Currency.getTableName(); */
  return {
    // RETRIEVE ---------------------------------------------------
    /**
     * @function get - Gets currency collection
     * @param {Object} req
     * @returns
     */
    async findByID(req) {
      const {
        pre: {
          user: { user, fake, sudo },
        },
        params: { id },
      } = req;

      try {
        const queryOptions = {
          where: {
            id,
            ...(sudo && { user_id: user.id }),
          },
          attributes: { exclude: ["user_id", "UserId"] },
        };
        let result = fake
          ? await BankDetail.FAKE()
          : await BankDetail.findOne(queryOptions);

        return result
          ? { result }
          : boom.notFound(`Address ID: ${id} not found!`);
      } catch (error) {
        console.error(error);
        return boom.boomify(error);
      }
    },

    async find(req) {
      const {
        query,
        pre: {
          user: { user, fake, sudo },
        },
      } = req;

      try {
        const queryFilters = await filters({
          query,
          searchFields: ["bank_name", "currency", "country"],
          extras: { ...(!sudo && { user_id: user?.id }) },
        });

        const queryOptions = {
          ...queryFilters,
        };

        const { limit, offset } = queryFilters;

        const queryset = fake
          ? await BankDetail.FAKE(limit)
          : await BankDetail.findAndCountAll(queryOptions);

        return paginator({
          queryset,
          limit,
          offset,
        });
      } catch (error) {
        console.error(error);
        throw boom.boomify(error);
      }
    },

    // UPDATE ---------------------------------------------------
    /**
     * @function updateByID
     * @describe Update single record by ID
     * @param {Object} req
     * @returns
     */
    async updateByID(req) {
      const {
        payload,
        params: { id },
        pre: {
          user: { user, sudo },
        },
      } = req;

      try {
        const queryOptions = {
          where: {
            ...(!sudo && { user_id: user.id }),
            id,
          },
          validate: true,
          returning: true,
        };

        return {
          result: await BankDetail.update(payload, queryOptions)
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
        throw boom.boomify(error);
      }
    },

    // CREATE ---------------------------------------------------

    async create(req) {
      const {
        payload,
        pre: {
          user: { user },
        },
      } = req;

      const queryOptions = {
        validate: true,
        fields: ["account_no", "swift_code", "currency", "bank_name"],
        returning: true,
      };

      try {
        return {
          result: await user
            .createBankDetail(payload, queryOptions)
            .catch((err) => {
              throw boom.badData(err.message, err);
            }),
        };
      } catch (error) {
        console.error(error);
        throw boom.boomify(error);
      }
    },

    // REMOVE ---------------------------------------------------

    async removeByID(req) {
      try {
        const {
          payload: { force = false },
          pre: {
            user: { user },
          },
          params: { id },
        } = req;

        const queryOptions = {
          where: {
            id,
            user_id: user.id,
          },
          force,
        };

        return {
          result: await BankDetail.destroy(queryOptions)
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
        return boom.forbidden(error);
      }
    },

    async remove(req) {
      const {
        payload: { ids = [], force = false },
        pre: {
          user: { user},
        },
      } = req;

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
              return await BankDetail.destroy(queryOptions).then((count) => ({
                status: Boolean(count),
                id,
              }));
            })
          ).catch((err) => {
            throw boom.badData(err.message, err);
          })
        );

        return {
          result,
        };
      } catch (error) {
        console.error(error);
        return boom.forbidden(error);
      }
    },

    // RESTORE------------------------------------------------------------

    async restoreByID(req) {
      const {
        params: { id },
        pre: {
          user: { user },
        },
      } = req;

      try {
        return {
          result: await BankDetail.restore({
            where: {
              id,
              user_id: user.id,
            },
          })
            .then((count) => ({
              id,
              status: Boolean(count),
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
     * @function restore - bulk restore currency records
     * @param {Object} req
     */
    async restore(req) {
      const {
        payload: { data = [] },
        pre: {
          user: { user },
        },
      } = req;

      try {
        return {
          result: await sequelize.transaction(async (t) =>
            Promise.all(
              data?.map(
                async (id) =>
                  await BankDetail.restore({
                    where: {
                      id,
                      user_id: user.id,
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
};

module.exports = BankDetailController;
