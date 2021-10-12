"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          "tbl_users_profile",
          "suitability",
          {
            type: Sequelize.INTEGER,
            defaultValue: 0,
          },
          { transaction: t }
        )
      ]);
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all( [
        queryInterface.removeColumn("tbl_users_profile", "suitability", { transaction: t })
      ]);
    });
  },
};
