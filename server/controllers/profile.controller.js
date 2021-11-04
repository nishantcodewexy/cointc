"use strict";

const ProfileController = (server) => {
  const { __update, __destroy } = require("./utils")(server);
  const {
    db: { Profile, sequelize },
    boom,
    helpers: { paginator, filters },
  } = server.app;

  return {
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
          searchFields: ["email"],
        });

        const options = {
          ...queryFilters,
        };

        if (sudo) {
          let queryset = fake
            ? await Profile.FAKE(fake_count)
            : await Profile.findAndCountAll(options);

          const { limit, offset } = queryFilters;

          return paginator({
            queryset,
            limit,
            offset,
          });
        }
        return {
          result: fake ? await Profile.FAKE() : await user?.getProfile(),
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
          result: fake ? await Profile.FAKE() : await Profile?.findOne(options),
        };
      } catch (err) {
        console.error(err);
        return boom.internal(err.message, err);
      }
    },
    /**
     * @function findByID
     * @describe finds record with matching ID
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
          searchFields: ["email"],
          extras: {
            id,
          },
        });
        const options = {
          ...queryFilters,
        };
        return {
          result: fake ? await Profile.FAKE() : await Profile?.findOne(options),
        };
      } catch (err) {
        console.error(err);
        return boom.internal(err.message, err);
      }
    },

    /**
     * @function create - create new record
     * @param {Object} req
     */
    async create(req) {},

    /**
     * @function update
     * @describe update multiple records or current session's user record
     * @param {Object} req
     */
    async update(req) {
      try {
        const {
          payload,
          pre: {
            user: { user, fake, sudo, fake_count },
          },
        } = req;
        let fields = [],
          result;

        if (sudo) {
          let { ids = [], ...data } = payload;

          if (!ids?.length) throw boom.badData(`<ids::array> cannot be empty`);
          if (!data) return boom.methodNotAllowed("Nothing to update");
          fields = [...fields, "suitability", "verified"];
          result = await sequelize.transaction(async (t) => {
            return await Promise.all(
              ids.map(
                async (id) =>
                  await Promise.all([
                    __update("Profile", data, {
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
          fields = [
            ...fields,
            "mode",
            "phone",
            "payment_methods",
            "pname",
            "oname",
            "lname",
            "date_of_birth",
          ];

          result = await Profile?.update(payload, {
            where: { user_id: user?.id },
            fields,
          });
        }
        return {
          result,
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
        let fields = ["two_factor"],
          result;

        if (!sudo)
          return boom.methodNotAllowed(
            `Only admins can perform this operation`
          );
        // update session user data
        result = await Profile?.update(payload, {
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

    /**
     * @function remove
     * @describe remove multiple records or current session's user record
     * @param {Object} req
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
                  return await Profile.destroy({
                    where,
                    force,
                    transaction: t,
                  });
                }),
              ]).catch((err) => (error = err))
          );
        } else {
          where = { id: user?.id };
          result = await Profile.destroy({
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
     * @function removeByID
     * @describe find record by ID and remove if found
     * @param {Object} req
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
      let result = await __destroy("Profile", where, force);
      return { status: Boolean(result), result };
    },

    /**
     * @function removeByUserID
     * @describe find record by user ID and remove if found
     * @param {Object} req
     */
    async removeByUserID(req) {
      let {
        payload: { force = false },
        params: { user_id },
        pre: {
          user: { user, sudo },
        },
      } = req;

      try {
        // only superadmins are allowed to permanently delete a user
        force = user?.isSuperAdmin ? force : false;
        let where = { user_id };
        let result = await __destroy("Profile", where, force);
        return { status: Boolean(result), result };
      } catch (err) {
        console.error(err);
        return boom.internal(err.message, err);
      }
    },
  };
};

module.exports = ProfileController;
