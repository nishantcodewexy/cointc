'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable('tbl_secessions', { 
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      user_id: {
        type: Sequelize.UUID,
        references: { model: 'tbl_users', key: 'id' }
      },
      level: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue:1
      },
      status: {
        type: Sequelize.ENUM(["accept","deny","pending"]),
        allowNull: false,
        defaultValue:"pending"
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      approval_date: Sequelize.DATE,
      archived_at: Sequelize.DATE,
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      }
      })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.dropTable('tbl_secessions');
  }
};
