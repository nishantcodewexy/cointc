"use strict";

const { filterFields } = require("../services/model");

module.exports = function SupportTicketController(server) {
  const {
    db,
    db: {
      SupportTicket,
      User,
      Sequelize: { Op },
    },
    helpers: { filters, paginator },
    boom,
  } = server.app;

  return {
    /**
     * @function get - Get a single support ticket record
     * @param {Object} req
     * @returns
     */
    async retrieve(req) {
      const {
        query,
        pre: { user },
        params: { id },
      } = req;
      try {
        let result = await SupportTicket.findOne({
          where: {
            id,
            ...(!user?.isAdmin && { user_id: user.id }),
          },
          attributes: { exclude: ["user_id", "UserId", "deleted_at"] },
        });

        return result ? { result } : boom.notFound("Support ticket not found!");
      } catch (err) {
        console.error(err);
        boom.internal(err.message, err);
      }
    },

    /**
     * @function bulkRetrieve
     * @param {Object} req
     * @returns
     */
    async bulkRetrieve(req) {
      const {
        query,
        pre: { user },
      } = req;

      try {
        const filterResults = await filters({
          query,
          searchFields: ["description"],
          ...(!user?.isAdmin && {
            extra: {
              user_id: user?.id,
            },
          }),
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

      let target = await SupportTicket.findByPk(id, {
        where: {
          ...(!user?.isSuperAdmin && {
            user_id: user.id,
          }),
        },
      });
      if (!target) return boom.notFound(`Ticket id, ${id} not found`);

      let result = await target.update(payload);
      return { result, message: "Update successful" };
    },

    async transferTo(req) {
      const {
        pre: { user },
        payload: { id, to },
      } = req;

      // Only an admin can transfer a support ticket to another admin
      if (!user?.access_level > 1)
        return boom.methodNotAllowed(`Only admins can perform this action!`);

      // find the target user
      let target_user = User.findByPk(to);
      if (!target_user?.access_level > 1)
        return boom.methodNotAllowed(`User ID: ${to} not found`);

      let ticket = await SupportTicket.findOne({
        where: {
          id,
          [Op.or]: {
            assigned_to: to,
            assigned_to: null,
          },
        },
      });
      if (!ticket)
        return boom.methodNotAllowed(
          `Ticket ID: ${id} is may already have been assigned and does not belong to you`
        );

      let result = await ticket.update({ assigned_to: to });
      return {
        from: user?.id,
        to,
        result,
        message: `Support ticket transfered by ${user?.id} to ${to}`,
      };
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
