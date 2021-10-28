"use strict";

let table_name = "tbl_users";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface
        .describeTable(table_name)
        .then(
          async (d) =>
            await queryInterface.sequelize.transaction(async (t) => {
              return await Promise.all([]);
            })
        )
        .catch(
          async () =>
            await queryInterface.createTable(table_name, {
              id: {
                type: Sequelize.UUID,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4,
              },
              email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
                validate: {
                  notEmpty: true,
                  isEmail: true,
                },
              },
              password: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                  notEmpty: true,
                },
              },
              role: Sequelize.STRING,
              permission: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
              },
              archived_at: Sequelize.DATE,
              created_at: Sequelize.DATE,
              updated_at: Sequelize.DATE,
              last_seen: Sequelize.DATE,
              login_at: Sequelize.DATE,
              access_level: {
                type: Sequelize.INTEGER,
                validate: {
                  min: 0,
                  isInt: true,
                  max: 3,
                },
                defaultValue: 1,
              },
            })
        );
    } catch (error) {
      console.error(error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(table_name);
  },
};
