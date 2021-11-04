"use strict";

const SecurityController = (server) => {
  const {
    db: { Security },
    boom,
    helpers: { paginator, filters },
  } = server.app;

  return {
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
          searchFields: ["email"],
        });
        // const include = filterAssociations(query?.include);

        const options = {
          ...queryFilters,
          // attributes: { exclude: ["password"] },
          //  include,
        };

        if (sudo) {
          let queryset = fake
            ? await Security.FAKE(fake_count)
            : await Security.findAndCountAll(options);

          const { limit, offset } = queryFilters;

          return paginator({
            queryset,
            limit,
            offset,
          });
        }
        return {
          result: fake ? await Security.FAKE() : await user?.getSecurity(),
        };
      } catch (err) {
        console.error(err);
        return boom.internal(err.message, err);
      }
    },
    async findByUserID(req) {},
    async create(req) {},

    async update(req) {
      try {
        const {
          payload,
          pre: {
            user: { user, fake, sudo, fake_count },
          },
        } = req;
        let fields, result;

        if (sudo) {
          let { ids = [], ...data } = payload;
          fields = ["two_factor"];
          if (!ids?.length) throw boom.badData(`<ids::array> cannot be empty`);

          if (!data) return boom.methodNotAllowed("Nothing to update");

          result = await sequelize.transaction(async (t) => {
            return await Promise.all(
              ids.map(
                async (id) =>
                  await Promise.all([
                    __update("Security", data, {
                      where: { id },
                      transaction: t,
                      fields,
                    }),
                  ])
              )
            );
          });
        } else {
          // update session user data
          result = await Security?.update(payload, {
            where: { user_id: user?.id },
            fields,
          });
        }
        return {
          status: Boolean(result),
          result,
        };
      } catch (error) {
        console.error(error);
        return boom.boomify(error);
      }
    },

    async updateByUserID(req) {},

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
                  return await Security.destroy({
                    where,
                    force,
                    transaction: t,
                  });
                }),
              ]).catch((err) => (error = err))
          );
        } else {
          where = { id: user?.id };
          result = await Security.destroy({
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
      let result = await __destroy("Security", where, force);
      return { status: Boolean(result), result };
    },

    async removeByUserID(req) {},
  };
};

module.exports = SecurityController;
