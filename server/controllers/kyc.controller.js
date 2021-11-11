"use strict";

function KycController(server) {
  const { __update, __destroy } = require("./utils")(server);
  const {
    db: { Kyc, sequelize },
    boom,
    helpers: { filters, paginator },
  } = server.app;

  return {
    // CREATE ---------------------------------------------------------

    /**
     * @function create - create single order record
     * @param {Object} req
     * @returns
     */
    async create(req) {
      const {
        pre: {
          user: { user },
        },
        payload,
      } = req;

      const { advert_id } = payload;
      if (!advert_id) throw boom.badRequest("Missing advert_id in request");

      try {
        // find advert
        let ad = await Advert.findByPk(advert_id);
        if (ad) {
          // create order using the user info
          return {
            result: await user.createOrder({
              ...payload,
            }),
          };
        } else
          return boom.notFound(
            "Advert cannot be found! Cannot create order for non-existent ad"
          );
      } catch (error) {
        console.error(error);
        throw boom.internal(error.message, error);
      }
    },
    // REMOVE ---------------------------------------------------------

    /**
     * @function remove - remove a single record
     * @param {Object} req
     * @returns
     */
    async remove(req) {
      const {
        payload: { ids = [], force = false },
        pre: {
          user: { user },
        },
      } = req;

      try {
        await sequelize.transaction(
          async (t) =>
            await Promise.all(
              ids.map(async (id) => {
                let where = { id, user_id: user?.id };
                return {
                  status: Boolean(await __destroy("Order", where, force)),
                  id,
                };
              })
            )
        );
      } catch (error) {
        console.error(error);
        throw boom.boomify(error);
      }
    },

    // RETRIEVE ---------------------------------------------------------

    /**
     * @function findByID
     * @param {Object} req
     * @returns
     */
    async findByID(req) {
      const {
        query,
        params: { id },
        pre: {
          user: { user, sudo, fake },
        },
      } = req;
      try {
        const queryFilters = await filters({
          query,
          searchFields: ["user_id", "status"],
          extras: {
            id,
            ...(!sudo && { user_id: user?.id }),
          },
        });

        const options = {
          ...queryFilters,
        };

        let result = fake ? await Kyc.FAKE() : await Kyc.findOne(options);
        return result
          ? { result }
          : boom.notFound(
              `Kyc with ID; ${id} with constraints: [${Object.entries(
                query
              ).join(",")}] not found!`
            );
      } catch (error) {
        console.error(error);
        return boom.internal(error.message, error);
      }
    },

    /**
     * @function find
     * @param {Object} req
     * @returns
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
          searchFields: ["user_id", "status"],
          extras: { ...(!sudo && { user_id: user?.id }) },
        });
        const options = {
          ...queryFilters,
        };
        const { limit, offset } = queryFilters;
        let queryset = fake
          ? await Kyc.FAKE(limit)
          : await Kyc.findAndCountAll(options);

        return await paginator({
          queryset,
          limit,
          offset,
        });
      } catch (error) {
        console.error(error);
        throw boom.boomify(error);
      }
    },

    /**
     * @function update
     * @param {Object} req
     * @returns
     */
    async update(req) {
      const {
        payload,
        pre: {
          user: { user, sudo },
        },
      } = req;
      let fields = sudo ? ["status"] : ["document_id"],
        operation;
      try {
        if (sudo) {
          let { ids = [], ...others } = payload;
          if (!ids?.length) return boom.badData(`<ids::array> cannot be empty`);

          operation = await sequelize.transaction(async (t) => {
            return await Promise.all(
              ids.map(async (id) => ({
                id,
                ...(await __update("Kyc", others, {
                  where: { id },
                  returning: true,
                  transaction: t,
                  fields,
                })),
              }))
            );
          });
        } else {
          let { id, ...others } = payload;
          if (!id) return boom.badData(`<id::uuid> cannot be empty`);
          operation = {
            id,
            ...(await __update("Kyc", others, {
              returning: true,
              where: { user_id: user?.id, id },
              fields,
            })),
          };
        }
        return operation;
      } catch (error) {
        console.error(error);
        throw boom.boomify(error);
      }
    },

    /**
     * @function updateByID
     * @param {Object} req
     * @returns
     */
    async updateByID(req) {
      const {
        payload,
        params: { id },
        pre: {
          user: { user, fake, sudo },
        },
      } = req;

      try {
        let where = { id, ...(!sudo && { user_id: user?.id }) },
          fields = sudo ? ["status"] : ["type"],
          options = { where, fields };

        let result = fake
          ? Kyc.FAKE()
          : await Kyc.update(payload, options).then(([count]) => count);

        return {
          status: Boolean(result),
          result,
        };
      } catch (error) {
        console.error(error);
        throw boom.boomify(error);
      }
    },
  };
}

module.exports = KycController;
