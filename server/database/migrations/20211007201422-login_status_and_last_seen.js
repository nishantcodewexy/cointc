"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let description = await queryInterface.describeTable("tbl_users");
    if (!("last_seen" in description))
      await queryInterface.addColumn(
        "tbl_users", // table name
        "last_seen", // new field name
        {
          type: Sequelize.DATE,
        }
      );

    if (!("login_at" in description))
      await queryInterface.addColumn(
        "tbl_users", // table name
        "login_at", // new field name
        {
          type: Sequelize.DATE,
        }
      );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("tbl_users", "last_seen");
    await queryInterface.removeColumn("tbl_users", "login_at");
  },
};
