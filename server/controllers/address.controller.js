"use strict";



const AddressController = (server) => {
  const {
    db: { Address, User },
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
     * @function remove - remove mulitple records
     * @param {Object} req  - request object
     * @param {Object} req.payload  - request body
     * @returns
     */
    async remove(req) {
      const {
        payload: { data = [], force = false },
        pre: {
          user: { user, fake, sudo, fake_count },
        },
      } = req;
      let result, where;
      try {
        if (sudo) {
          if (!data?.length)
            throw boom.badData("Expected an array of user IDs. None provided!");

          result = await sequelize.transaction(
            async (t) =>
              await Promise.all([
                data.map(async (id) => {
                  where = { id };
                  return await Address.destroy({
                    where,
                    force,
                    transaction: t,
                  });
                }),
              ]).catch((err) => (error = err))
          );
        } else {
          where = { id: user?.id };
          result = await Address.destroy({
            where: { user_id: user?.id },
            force,
          });
        }

        return {
          status: Boolean(result),
          result,
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
    /**
     * @function create - Creates a single advert
     * @param {Object} req
     * @returns
     */
    async create(req) {
      const {
        payload,
        pre: {
          user: { user, fake },
        },
      } = req;
      try {
        return {
          result: fake
            ? await Address.FAKE()
            : await user.createAddress(payload).catch((err) => {
                throw boom.badData(err.message, err);
              }),
        };
      } catch (err) {
        console.error(err);
        return boom.internal(err.message, err);
      }
    },
  };

};

module.exports = AddressController;
