"use strict";
const Tatum = require('@tatumio/tatum');
/**
 * @description - KYC Controller helpers
 * @param {Object} server  - Hapi Server Instance
 * @returns
 */
function TransactionController(server) {
  const {
    db: { Wallet },
    boom,
  } = server.app;
  return {
    async retrieveByAddress() { },
    async retrieveByAccount(){},
    async bulkRetrieve(req) {
      const { query, params: {address} } = req;
      try {
        return null;
      } catch (error) {
        console.error(error);
        boom.boomify(error);
      }
    },
  };
}

module.exports = TransactionController;
