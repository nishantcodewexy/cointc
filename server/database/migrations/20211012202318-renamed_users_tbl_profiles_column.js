"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let description = await queryInterface.describeTable(
      "tbl_admin_users_profile"
    );
    if ("id" in description)
      await queryInterface.renameColumn(
        "tbl_admin_users_profile",
        "id",
        "profile_id"
      );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn(
      "tbl_admin_users_profile",
      "profile_id",
      "id"
    );
  },
};
