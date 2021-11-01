"use strict";

/**
 * @description - KYC Controller helpers
 * @param {Object} server  - Hapi Server Instance
 * @returns
 */
function KYCController(server) {
  const {
    db: { KYC },
    boom,
  } = server.app;
  return {
    async fetch(req, h) {
      const { params } = req;
      try {
        return null;
      } catch (error) {
        console.error(error);
        boom.boomify(error);
      }
    },
  };
}

module.exports = KYCController;
