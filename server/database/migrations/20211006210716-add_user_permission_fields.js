'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: true,
    // }
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.addColumn(
      'tbl_users', // table name
      'permission', // new field name
      {
        type: Sequelize.BOOLEAN,
        defaultValue:true
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
     await queryInterface.removeColumn('tbl_users', 'permission')
  }
};
