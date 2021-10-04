"use strict";
const assert = require("assert");

/**
 * @description - KYC Controller helpers
 * @param {Object} server  - Hapi Server Instance
 * @returns
 */
module.exports = (server) => {
  const {
    db: { User },
    boom,
  } = server.app;
  const kycController = {
    async fetch(req, h) {
      try {
        const { type } = req.params;

        const UserController = require("./user")(server);

        let profile = await UserController.profile(req);
        let kyc = profile.kyc;
        return type ? { [type]: kyc[type] } : kyc;
      } catch (error) {
        console.error(error);
        boom.boomify(error);
      }
    },
  };

  const kycGroupController = (req, h) => {};

  return { ...kycController, group: kycGroupController };
};
