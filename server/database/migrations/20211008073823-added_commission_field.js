"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let description = queryInterface.describeTable("tbl_referrals");

    if (!"commission" in description)
      await queryInterface.addColumn(
        "tbl_referrals", // table name
        "commission", // new field name
        {
          type: Sequelize.DOUBLE,
          validate: {
            min: 0,
            max: 100,
          },
          defaultValue: process.env.REFERRAL_COMISSION || 20,
        }
      );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("tbl_referrals", "commission");
  },
};
