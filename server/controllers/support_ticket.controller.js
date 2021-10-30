"use strict";

const { filterFields } = require("../services/model");

module.exports = function SupportTicketController(server) {
  const {
    db,
    db: { SupportTicket },
    helpers: { filters, paginator },
    boom,
  } = server.app;

  return {
    /**
     * @function get - Gets currency collection
     * @param {Object} req
     * @returns
     */
    async retrieve(req) {
      const {
        query,
        pre: { user },
        params: { id },
      } = req;

      return await SupportTicket.findOne({
        where: {
          id,
          ...(!user?.isAdmin && { user_id: user.id }),
        },
        attributes: { exclude: ["user_id", "UserId", "deleted_at"] },
      });
    },
    async bulkRetrieve(req) {
      const {
        query,
        pre: { user },
      } = req;

      try {
        const filterResults = await filters({
          query,
          searchFields: ["description"],
          extra: {
            ...(!user?.isAdmin && {
              user_id: user?.id,
            }),
          },
        });

        const queryset = await SupportTicket.findAndCountAll(filterResults);

        return paginator({
          queryset,
          limit: filterResults.limit,
          offset: filterResults.offset,
        });
      } catch (error) {
        console.error(error);
        throw boom.internal(error?.message, error);
      }
    },

    async update(req) {
      const {
        pre: { user },
        payload,
        params: { id },
      } = req;

      return await SupportTicket.update(payload, {
        where: {
          ...(!user?.isAdmin && {
            user_id: user.id,
          }),
          id,
        },
      });
    },
    async create(req) {
      const {
        payload,
        pre: { user },
      } = req;
      try {
        const object = await SupportTicket.create({
          ...payload,
          user_id: user?.id,
        });
        return {
          result: await filterFields({
            object: object.dataValues,
            exclude: ["user_id", "deleted_at", "UserId", "user_id"],
          }),
        };
      } catch (error) {
        console.error(error);
        throw boom.boomify(error);
      }
    },
    async remove(req) {
      const {
        pre: { user },
        params: { id },
      } = req;

      return await SupportTicket.destroy({
        where: {
          ...(!user?.isAdmin && {
            user_id: user.id,
          }),
          id,
        },
      });
    },
  };
};
