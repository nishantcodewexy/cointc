"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let table_name = "tbl_users";

    // Create table with ID if not exist
    await queryInterface.describeTable(table_name).then((tableDefinition) => {
      if (!tableDefinition) return Promise.resolve();

      return queryInterface.createTable(table_name, {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
        },
      });
    });

    // return queryInterface.sequelize.transaction((t) => {
    //   return Promise.all([]);
    // });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
