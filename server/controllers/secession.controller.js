"use strict";

module.exports = function SecessionController(server) {
  const {
    db: {
      Secession,
      Sequelize: { Op },
    },
    boom,
    helpers: { filters, paginator },
  } = server.app;

  return {
    // CREATE ---------------------------------------------------------------

    async create(req) {
      const {
        payload,
        auth: {
          credentials: { user },
        },
        query:{fake=false}
      } = req;

      if(fake) return await Secession.FAKE()

      const { id, level, status, description } = await Secession.create({
        ...payload,
        user_id: user.id,
      });
      return { id, level, status, description };
    },

    // RETRIEVE ---------------------------------------------------------------
    /**
     * @function bulkRetrieve - retrieves multiple currency record
     * @param {Object} req
     * @returns
     */
    async bulkRetrieve(req) {
      const {
        query,
        pre: { isAdmin },
        auth: {
          credentials: { user },
        },
      } = req;
      

      if (isAdmin) {
        const filterResults = await filters({
          query,
          searchFields: ["status", "description"],
        });

        const queryset = Secession.findAndCountAll(filterResults);

        return await paginator({
          queryset,
          limit: filterResults.limit,
          offset: filterResults.offset,
        });
      } else {
        const filterResults = await filters({
          query,
          extra: {
            user_id: user.id,
            archived_at: {
              [Op.is]: null,
            },
          },
        });

        const queryset = Secession.findAndCountAll(filterResults);

        return await paginator({
          queryset,
          limit: filterResults.limit,
          offset: filterResults.offset,
        });
      }
    },

    /**
     * @function retrieve - retrieves a single currency record
     * @param {Object} req
     * @returns
     */
    async retrieve(req) {
      const {
        params: { id },
        pre: { user },
      } = req;

      

      return await Secession.findByPk(id);
    },

    // DELETE ---------------------------------------------------------------

    async remove(req) {
      const {
        params: { id },
        pre: { isAdmin },
      } = req;

      if (!isAdmin) throw boom.forbidden();

      return await Secession.destroy({
        where: { id },
      });
    },
    async bulkRemove(req) {
      const {
        pre: { isAdmin },
        payload,
      } = req;

      if (!isAdmin) throw boom.forbidden();

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
    async update(req) {
      const {
        payload,
        params: { id },
        pre:{user}
      } = req;

      return await Secession.update(payload, {
        where: { 
          id,
          ...(user?.isAdmin||user?.isSuperUser?{}:{user_id:user.id})
         },
      });
    },
  };
};
