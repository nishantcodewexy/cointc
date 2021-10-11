'use strict';
const {
  types:{
    KycStatusType
  }
} = require("../../consts")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.addColumn(
      'tbl_users_profile', // table name
      'profile_pic', // new field name
      {
        type:Sequelize.UUID,
        references: {
          model: {
            tableName: 'tbl_uploads',
          },
          key: 'id',
        }
        
      }
    )

     await queryInterface.addColumn(
      'tbl_users_profile', // table name
      'kyc_document', // new field name
      {
        type:Sequelize.UUID,
        references: {
          model: {
            tableName: 'tbl_uploads',
          },
          key: 'id',
        }
        
      }
    )

     await queryInterface.addColumn(
      'tbl_users_profile', // table name
      'kyc_status', // new field name
      {
        type:Sequelize.ENUM(Object.keys(KycStatusType)),
        defaultValue:KycStatusType.PENDING
        
      }
    )
     await queryInterface.addColumn(
      'tbl_users_profile', // table name
      'date_of_birth', // new field name
      {
        type:Sequelize.DATE
        
      }
    )
     await queryInterface.addColumn(
      'tbl_users_profile', // table name
      'last_name', // new field name
      {
        type:Sequelize.STRING
        
      }
    )
     await queryInterface.addColumn(
      'tbl_users_profile', // table name
      'other_names', // new field name
      {
        type:Sequelize.STRING
        
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
  }
};
