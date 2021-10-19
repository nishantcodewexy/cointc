"use strict";
const assert = require("assert");
// const sequelize = require('sequelize')
module.exports = (server) => {
  const { __findAllWithPagination, __destroy } = require("./_methods")(server);
  const {
    db: { Referral, User, BasicProfile, Sequelize: {Op} },
    boom,
    helpers: { filters, paginator },
  } = server.app;

  return {
    // Delete Order
    async bulkRemove(req) {
      try {
        const { data, force } = req.payload;
        const where = {
          [Op.or]: data,
        };

        return await __destroy("Referral", where, force, {});
      } catch (error) {
        console.error(error);
        throw boom.boomify(error);
      }
    },

    /**
     * @function retrieve - Retrieves a single referrals
     * @param {Object} req
     * @returns
     */
    async retrieve(req) {
      const {
        query,
        params: { id },
        pre: { user },
      } = req;

      try {
        let where, options;
        options = {};

        where = { id };

        return Referral.findOne(where, options);
      } catch (error) {
        console.error(error);
        throw boom.boomify(error);
      }
    },

    /**
     * @function bulkRetrieve - Bulk retrieves referrals
     * @param {Object} req
     * @returns
     */
    async bulkRetrieve(req) {
      const {
        query,
        pre: { user },
      } = req;

      try {
        let extra, options, searchFields;
        searchFields = [];
        options = {
          logging: console.log,
          include: [
            {
              model: User,
              attributes: ["createdAt"],
              include: [
                {
                  model: BasicProfile,
                  attributes: ["nickname", "last_name", "other_names", "email"],
                },
              ],
            },
          ],
          right: true
        };

        if (user.isAdmin) {
          extra = {
            [Op.ne]: {
              user_id: null
            }
          };
        } else {
          extra = {
            referral_id: user.id,
          };
        }

        return await __findAllWithPagination(
          "Referral",
          query,
          extra,
          searchFields,
          options
        );
      } catch (error) {
        console.error(error);
        throw boom.boomify(error);
      }
    },
  };
};
