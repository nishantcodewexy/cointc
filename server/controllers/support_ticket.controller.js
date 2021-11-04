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
     * @function findByID - Get a single support ticket record
     * @param {Object} req
     * @returns
     */
    async findByID(req) {
      const {
        query,
        pre: {
          user: { user, sudo, fake },
        },
        params: { id },
      } = req;
      try {
        let result = fake
          ? SupportTicket.FAKE()
          : await SupportTicket.findOne({
              where: {
                id,
                ...(!sudo && { user_id: user.id }),
              },
              attributes: { exclude: ["user_id", "UserId"] },
            });

        return result
          ? { result }
          : boom.notFound(`Support ticket with ID: ${id} not found!`);
      } catch (err) {
        console.error(err);
        boom.internal(err.message, err);
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
          user: { user, sudo, fake, fake_count },
        },
      } = req;

      try {
        const filterResults = await filters({
          query,
          searchFields: ["description"],
          ...(!sudo && {
            extra: {
              user_id: user?.id,
            },
          }),
        });

        const queryset = fake
          ? SupportTicket.FAKE(fake_count)
          : await SupportTicket.findAndCountAll(filterResults);

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

    async updateByID(req) {
      const {
        pre: {
          user: { user, sudo },
        },
        payload,
        params: { id },
      } = req;

      let target = await SupportTicket.findByPk(id, {
        where: {
          ...(!sudo && {
            user_id: user.id,
          }),
        },
      });
      if (!target) return boom.notFound(`Ticket id, ${id} not found`);

      let result = await target.update(payload);
      return { result, message: "Update successful" };
    },

    /**
     * @function transferByID - Transfer support ticket from one admin to another
     * @param {Object} req
     * @returns
     */
    async transferByID(req) {
      const {
        params: { id },
        pre: {
          user: { sudo, user, fake },
        },
        payload: { to },
      } = req;

      // Only an admin can transfer a support ticket to another admin
      if (!sudo)
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
        pre: {
          user: { user, sudo },
        },
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

    async removeByID(req) {
      const {
        pre: {
          user: { user, sudo },
        },
        params: { id },
      } = req;

      return await SupportTicket.destroy({
        where: {
          ...(!sudo && {
            user_id: user.id,
          }),
          id,
        },
      });
    },
  };
};
