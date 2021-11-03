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
            ...(sudo && { user_id: user.id }),
            attributes: { exclude: ["user_id", "UserId"] },
          },
        };
        let result = fake
          ? await BankDetail.FAKE()
          : await BankDetail.findByPk(id, queryOptions);
        return result ? { result } : boom.notFound("Record not found");
      } catch (error) {
        console.error(error);
        return boom.boomify(error);
      }
    },

    async find(req) {
      const {
        query,
        pre: {
          user: { user, fake, fake_count, sudo },
        },
      } = req;

      try {
        const queryFilters = await filters({
          query,
          searchFields: ["bank_name", "currency", "country"],
          extras: { ...(!sudo ? { user_id: user?.id } : null) },
        });

        const queryOptions = {
          ...queryFilters,
        };

        const queryset = fake
          ? await BankDetail.FAKE(fake_count)
          : await BankDetail.findAndCountAll(queryOptions);
        const { limit, offset } = queryFilters;

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

    async updateByID(req) {
      const {
        payload,
        params: { id },
        pre: { user },
      } = req;

      try {
        const queryOptions = {
          where: {
            ...(user?.isAdmin || user?.isSuperAdmin
              ? {}
              : { user_id: user.id }),
            id,
          },
          validate: true,
          returning: true,
        };

        return {
          result: await BankDetail.update(payload, queryOptions)
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
        throw boom.boomify(error);
      }
    },

    // CREATE ---------------------------------------------------

    async create(req) {
      const {
        payload,
        pre: { user },
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
          pre: { user },
          params: { id },
        } = req;

        const queryOptions = {
          where: {
            id,
            ...(user?.isAdmin || user?.isSuperAdmin
              ? {}
              : { user_id: user.id }),
          },
          force,
        };

        return {
          result: await BankDetail.destroy(queryOptions)
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
        return boom.forbidden(error);
      }
    },

    async remove(req) {
      const {
        payload: { data = [], force = false },
        pre: { user },
      } = req;
      let total = 0;

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
              return await BankDetail.destroy(queryOptions).then((count) => ({
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
        return boom.forbidden(error);
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
          result: await BankDetail.restore({
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
    async restoreByID(req) {
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
                  await BankDetail.restore({
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
};

module.exports = BankDetailController;
