"use strict";

const AddressController = (server) => {
  const { __update, __destroy } = require("./utils")(server);
  const {
    db: { Address, sequelize },
    boom,
    helpers: { paginator, filters },
  } = server.app;
  return {
    /**
     * @function findByID - Gets currency collection
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
          ? await Address.FAKE()
          : await Address.findOne(queryOptions);

        return result
          ? { result }
          : boom.notFound(`Address ID: ${id} not found!`);
      } catch (error) {
        console.error(error);
        return boom.boomify(error);
      }
    },

    /**
     * @function find - Retrieves multiple advert records
     * @param {Object} req
     */
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
          searchFields: ["address_line"],
          extras: {
            ...(sudo ? {} : { user_id: user.id }),
          },
        });
        const options = {
          ...queryFilters,
          // logging: console.log,
          // include: User,
          // attributes: { include: [["User", "user"]] },
        };

        const { limit, offset } = queryFilters;
        let queryset = fake
          ? await Address.FAKE(limit)
          : await Address.findAndCountAll(options).catch((err) => {
              throw boom.badData(err.message, err);
            });

        return paginator({
          queryset,
          limit,
          offset,
        });
      } catch (err) {
        console.error(err);
        return boom.isBoom ? err : boom.internal(err.message, err);
      }
    },

    // REMOVE --------------------------------------------
    /**
     * @function remove - remove mulitple records
     * @param {Object} req  - request object
     * @param {Object} req.payload  - request body
     * @returns
     */
    async remove(req) {
      const {
        payload,
        pre: {
          user: { user, fake },
        },
      } = req;
      try {
        let { ids = [], force = false } = payload;

        if (!ids?.length)
          throw boom.badData(
            "Expected an array of address IDs. None provided!"
          );

        let result = await sequelize.transaction(
          async (t) =>
            await Promise.all(
              ids.map(async (id) => ({
                id,
                status: Boolean(
                  await __destroy("Address", { id, user_id: user?.id }, force, {
                    transaction: t,
                    returning: true,
                  })
                ),
              }))
            ).catch((err) => (error = err))
        );

        return {
          result,
        };
      } catch (err) {
        console.error(err);
        return boom.internal(err.message, err);
      }
    },

    /**
     * @function removeByID - Remove single record by ID
     * @param {Object} req
     * @returns
     */
    async removeByID(req) {
      let {
        payload: { force = false },
        params: { id },
        pre: {
          user: { user },
        },
      } = req;
      // only superadmins are allowed to permanently delete a user
      let where = { id, user_id: user?.id };
      let result = await __destroy("Address", where, force);
      return { status: Boolean(result), result, id };
    },

    // UPDATE--------------------------------------

    /**
     * @function updateByID
     * @describe update single records by ID
     * @param {Object} req
     */
    async updateByID(req) {
      try {
        const {
          params: { id },
          payload,
          pre: {
            user: { user },
          },
        } = req;
        let fields = ["country", "address_line"],
          result;

        result = await Address?.update(payload, {
          where: { id, user_id: user?.id },
          fields,
        }).then(([count]) => count);

        return {
          id,
          status: Boolean(result),
        };
      } catch (error) {
        console.error(error);
        return boom.boomify(error);
      }
    },
  };
};

module.exports = AddressController;
