"use strict";
const assert = require("assert");

/**
 * @description - KYC Controller helpers
 * @param {Object} server  - Hapi Server Instance
 * @returns
 */
function KYCController(server) {
  const {
    db: { User },
    boom,
  } = server.app;
  return {
    async fetch(req, h) {
      try {
        const { type } = req.params;

        const UserController = require("./user.controller")(server);

        let profile = await UserController.profile(req);
        let kyc = profile.kyc;
        return type ? { [type]: kyc[type] } : kyc;
      } catch (error) {
        console.error(error);
        boom.boomify(error);
      }
    },
  };
}

module.exports = KYCController;
