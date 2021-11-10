"use strict";
const Tatum = require("@tatumio/tatum");
/**
 * @description - KYC Controller helpers
 * @param {Object} server  - Hapi Server Instance
 * @returns
 */
function TransactionController(server) {
  const {
    db: { Transaction, Order },
    boom,
  } = server.app;
  return {
    /**
     * @function find
     * @describe - Find multiple records
     * @param {Object} req
     * @returns
     */
    async find(req) {
      const {
        query,
        pre: {
          user: { user, fake, sudo },
        },
      } = req;
      try {
        const queryFilters = await filters({
          query,
          searchFields: ["user_id"],
        });

        /* const include = validateAndFilterAssociation(
          query?.include,
          ["security"],
          User
        ); */

        const options = {
          ...queryFilters,
          // attributes: { exclude: ["password"] },
        };

        const { limit, offset } = queryFilters;

        let queryset = fake
          ? await Transaction.FAKE(limit)
          : await Transaction.findAndCountAll(options);

        return paginator({
          queryset,
          limit,
          offset,
        });
      } catch (error) {
        console.error(error);
        return boom.internal(error.message, error);
      }
    },

    /**
     * @function findByID
     * @describe - Find record by ID
     * @param {Object} req
     * @returns
     */
    async findByID(req) {
      const {
        params: { id },
        query,
        pre: {
          user: { user, fake, sudo },
        },
      } = req;
      try {
        const queryFilters = await filters({
          query,
          searchFields: ["user_id"],
          extras: {
            id,
          },
        });

        const options = {
          ...queryFilters,
          // attributes: { exclude: ["password"] },
        };

        const { limit, offset } = queryFilters;

        let result = fake
          ? await Transaction.FAKE()
          : await Transaction.findOne(options);

        return { result };
      } catch (error) {
        console.error(error);
        return boom.internal(error.message, error);
      }
    },
  };
}

module.exports = TransactionController;
