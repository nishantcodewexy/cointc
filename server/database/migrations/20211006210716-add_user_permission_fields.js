"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let description = await queryInterface.describeTable("tbl_users");

    if (!("permission" in description))
      return await queryInterface.addColumn(
        "tbl_users", // table name
        "permission", // new field name
        {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
        }
      );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("tbl_users", "permission");
  },
};
