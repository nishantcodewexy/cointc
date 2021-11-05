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
     * @function bulkRetrieve - Retrieves multiple advert records
     * @param {Object} req
     */
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
          searchFields: ["address_line"],
          extras:{
            ...(sudo?{}:{user_id:user.id})
          }
        });
        const options = {
          ...queryFilters,
          logging: console.log,
          // include: User,
          // attributes: { include: [["User", "user"]] },
        };
        
        let queryset = fake
          ? await Address.FAKE(fake_count)
          : await Address.findAndCountAll(options).catch((err) => {
              throw boom.badData(err.message, err);
            });
        
        const { limit, offset } = queryFilters;

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
          ? await Address.FAKE()
          : await Address.findByPk(id, queryOptions);
        return result ? { result } : boom.notFound("Record not found");
      } catch (error) {
        console.error(error);
        return boom.boomify(error);
      }
    },
    /**
     * @function find
     * @describe finds multiple records or current session's user record
     * @param {Object} req
     */
    async find(req) {
      const {
        query,
        pre: {
          user: { user, fake, sudo, fake_count },
        },
      } = req;

      try {
        const queryFilters = await filters({
          query,
          searchFields: ["user_id"],
        });

        const options = {
          ...queryFilters,
        };

        if (sudo) {
          let queryset = fake
            ? await Address.FAKE(fake_count)
            : await Address.findAndCountAll(options);

          const { limit, offset } = queryFilters;

          return paginator({
            queryset,
            limit,
            offset,
          });
        }
        return {
          result: fake ? await Address.FAKE() : await user?.getAddress(),
        };
      } catch (err) {
        console.error(err);
        return boom.internal(err.message, err);
      }
    },

    /**
     * @function findByID
     * @describe finds record with matching user ID
     * @param {Object} req
     */
    async findByID(req) {
      const {
        query,
        params: { id },
        pre: {
          user: { user, fake, sudo, fake_count },
        },
      } = req;

      try {
        const queryFilters = await filters({
          query,
          searchFields: ["user_id"],
          extras: {
            id,
          },
        });
        const options = {
          ...queryFilters,
        };
        return {
          result: fake ? await Address.FAKE() : await Address?.findOne(options),
        };
      } catch (err) {
        console.error(err);
        return boom.internal(err.message, err);
      }
    },
    /**
     * @function findByUserID
     * @describe finds record with matching user ID
     * @param {Object} req
     */
    async findByUserID(req) {
      const {
        query,
        params: { user_id },
        pre: {
          user: { user, fake, sudo, fake_count },
        },
      } = req;

      try {
        const queryFilters = await filters({
          query,
          searchFields: ["email"],
          extras: {
            user_id: user_id,
          },
        });
        const options = {
          ...queryFilters,
        };
        return {
          result: fake ? await Address.FAKE() : await Address?.findOne(options),
        };
      } catch (err) {
        console.error(err);
        return boom.internal(err.message, err);
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
          user: { user, fake, sudo, fake_count },
        },
      } = req;
      let result, where;
      try {
        let { ids = [], force = false } = payload;

        if (!ids?.length)
          throw boom.badData(
            "Expected an array of address IDs. None provided!"
          );

        return {
          result: await sequelize.transaction(
            async (t) =>
              await Promise.all(
                ids.map(async (id) => ({
                  id,
                  status: Boolean(
                    await __destroy(
                      "Address",
                      { id, ...(!sudo && { user_id: user?.id }) },
                      force,
                      {
                        transaction: t,
                        returning: true,
                      }
                    )
                  ),
                }))
              ).catch((err) => (error = err))
          ),
        };
      } catch (err) {
        console.error(err);
        return boom.internal(err.message, err);
      }
    },

    /**
     * @function remove - Remove single User
     * @param {Object} req
     * @returns
     */
    async removeByID(req) {
      let {
        payload: { force = false },
        params: { id },
        pre: {
          user: { user, sudo },
        },
      } = req;
      // only superadmins are allowed to permanently delete a user
      force = user?.isSuperAdmin ? force : false;
      let where = { id };
      let result = await __destroy("Address", where, force);
      return { status: Boolean(result), result };
    },
    async removeByUserID(req) {},

    // UPDATE--------------------------------------

    /**
     * @function update
     * @describe update multiple records or current session's user record
     * @param {Object} req
     */
    async updateByID(req) {
      try {
        const {
          params: { id },
          payload,
          pre: {
            user: { user, fake, sudo, fake_count },
          },
        } = req;
        let fields = [],
          result;

        // update session user data
        fields = [...fields, "country", "address_line"];

        result = await Address?.update(payload, {
          where: { id, user_id: user?.id },
          fields,
        }).then(([count]) => count);

        return {
          id: user?.id,
          status: Boolean(result),
        };
      } catch (error) {
        console.error(error);
        return boom.boomify(error);
      }
    },

    /**
     * @function updateByUserID
     * @describe update record using the user ID
     * @param {Object} req
     */
    async updateByUserID(req) {
      try {
        const {
          payload,
          params: { user_id },
          pre: {
            user: { user, fake, sudo, fake_count },
          },
        } = req;
        let fields = ["country"],
          result;

        if (!sudo)
          return boom.methodNotAllowed(
            `Only admins can perform this operation`
          );
        // update session user data
        result = await Address?.update(payload, {
          where: { user_id },
          fields,
        });

        return {
          status: Boolean(result),
          result,
        };
      } catch (error) {
        console.error(error);
        return boom.boomify(error);
      }
    },
  };

};

module.exports = AddressController;
