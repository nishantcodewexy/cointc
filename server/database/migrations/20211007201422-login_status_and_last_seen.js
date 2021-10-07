'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.addColumn(
      'tbl_users', // table name
      'last_seen', // new field name
      {
        type: Sequelize.DATE
      },
    )
    await queryInterface.addColumn(
      'tbl_users', // table name
      'login_at', // new field name
      {
        type: Sequelize.DATE
      },
    )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.removeColumn('tbl_users', 'last_seen')
     await queryInterface.removeColumn('tbl_users', 'login_at')
  }
};
