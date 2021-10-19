"use strict";
const assert = require("assert");

const { Op } = require("sequelize");

module.exports = (server) => {
  const {
    db: { Secession, sequelize, User, AdminProfile, BasicProfile },
    boom,
    helpers: { filters, paginator, isAdmin },
  } = server.app;

  return {
    // CREATE ---------------------------------------------------------------

    async create(req) {
      const {
        payload,
        auth: {
          credentials: { user },
        },
      } = req;

      const { id, level, status, description } = await Secession.create({
        ...payload,
        user_id: user.id,
      });
      return { id, level, status, description };
    },

    // RETRIEVE ---------------------------------------------------------------

    async bulkRetrieve(req) {
      try {
        const {
          query,
          pre: { user },
        } = req;

        let filterResults, queryset;

        if (isAdmin(user)) {
          filterResults = await filters({
            query,
            searchFields: ["status", "description"],
          });

          queryset = await Secession.findAndCountAll({
            ...filterResults,
            include: {
              association: "User",
              attributes: { exclude: ["password"] },
              where: {
                id: {
                  [Op.ne]: user?.id,
                },
              },
              /*  include: [
                { model: BasicProfile, attributes: ["nickname"] },
                { model: AdminProfile, attributes: ["nickname"] },
              ], */
            },
          });
        } else {
          filterResults = await filters({
            query,
            extra: {
              user_id: user.id,
              archived_at: {
                [Op.is]: null,
              },
            },
          });

          queryset = await Secession.findAndCountAll(filterResults);
        }

        return paginator({
          queryset,
          limit: filterResults.limit,
          offset: filterResults.offset,
        });
      } catch (error) {
        console.error(error);
        return boom.boomify(error);
      }
    },

    async retrieve(req) {
      const {
        params: { id },
        pre: { isAdmin },
      } = req;

      if (!isAdmin) throw boom.forbidden();

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
      } = req;

      return await Secession.update(payload, {
        where: { id },
      });
    },
  };
};
