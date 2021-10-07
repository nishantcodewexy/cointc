'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.removeColumn('tbl_admin_users_profile', 'last_login')
     await queryInterface.removeColumn('tbl_users_profile', 'last_login')
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.addColumn(
      'tbl_users_profile', // table name
      'last_login', // new field name
      {
        type: Sequelize.DATE
      },
    )
    await queryInterface.addColumn(
      'tbl_admin_users_profile', // table name
      'last_login', // new field name
      {
        type: Sequelize.DATE
      },
    )
  }
};
