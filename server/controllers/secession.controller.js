"use strict";

module.exports = function SecessionController(server) {
  const {
    db: {
      Secession,
      Sequelize: { Op },
    },
    boom,
    helpers: { filters, paginator, validateAndFilterAssociation },
  } = server.app;

  return {
    // CREATE ---------------------------------------------------------------

    async create(req) {
      const {
        payload,
        pre: {
          user: { user, sudo },
        },
        query:{fake=false}
      } = req;

      const result = await user.createSecession(payload);
      return {
        result,
      };
    },

    // RETRIEVE ---------------------------------------------------------------
    /**
     * @function find - find multiple records
     * @param {Object} req
     * @returns
     */
    async find(req) {
      const {
        query,
        pre: {
          user: { user, sudo, fake, fake_count },
        },
      } = req;
      try {
        const queryFilters = await filters({
          query,
          searchFields: ["status", "description"],
          ...(!sudo && {
            extra: {
              user_id: user?.id,
            },
          }),
        });

        const include = validateAndFilterAssociation(
          query?.include,
          ["user"],
          Secession
        );
        
        const options = {
          ...queryFilters,
          // attributes: { exclude: ["password"] },
          include,
        };
        const result = fake
          ? Secession.FAKE(fake_count)
          : await Secession.findAndCountAll(options);

        return await paginator({
          queryset: result,
          limit: queryFilters.limit,
          offset: queryFilters.offset,
        });
      } catch (err) {
        console.error(err);
        return boom.internal(err.message, err);
      }
    },

    /**
     * @function retrieve - retrieves a single currency record
     * @param {Object} req
     * @returns
     */
    async findByID(req) {
      const {
        params: { id },
        pre: {
          user: { user, fake },
        },
      } = req;

      return { result: fake ? Secession.FAKE() : await Secession.findByPk(id) };
    },

    // DELETE ---------------------------------------------------------------

    async removeByID(req) {
      const {
        params: { id },
        pre: {
          user: { user, sudo },
        },
      } = req;

      if (!sudo) throw boom.forbidden();

      return await Secession.destroy({
        where: { id },
      });
    },

    async remove(req) {
      const {
        pre: {
          user: { user, sudo },
        },
        payload,
      } = req;

      if (!sudo) throw boom.forbidden();

      return await Secession.destroy({
        where: {
          id: {
            [Op.in]: payload,
          },
        },
      });
    },

    // UPDATE ---------------------------------------------------------------
    /**
     * @function update - Update single secession record
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

      let result = await Secession.update(payload, {
        where: {
          id,
          ...(!sudo && { user_id: user?.id }),
        },
      });

      return {
        id,
        status: Boolean(result),
        result,
      };
    },
  };
};
