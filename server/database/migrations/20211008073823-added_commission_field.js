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
      'tbl_referrals', // table name
      'commission', // new field name
      {
        type:Sequelize.DOUBLE,
        validate:{
          min:0,
          max:100
        },
        defaultValue:process.env.REFERRAL_COMISSION||20
        
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.removeColumn('tbl_referrals', 'commission')
  }
};
