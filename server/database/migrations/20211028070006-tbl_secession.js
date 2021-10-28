"use strict";

let table_name = "tbl_secessions";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface
        .describeTable(table_name)
        .then(
          async () =>
            await queryInterface.sequelize.transaction(async (t) => {
              return await Promise.all([]);
            })
        )
        .catch(
          async (d) =>
            await queryInterface.createTable(table_name, {
              id: {
                type: Sequelize.UUID,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4,
              },
              level: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 1,
              },
              status: {
                type: Sequelize.ENUM(["accept", "deny", "pending"]),
                allowNull: false,
                defaultValue: "pending",
              },
              description: {
                type: Sequelize.TEXT,
                allowNull: true,
              },
              approval_date: Sequelize.DATE,
              archived_at: Sequelize.DATE,
              created_at: {
                type: Sequelize.DATE,
              },
              updated_at: {
                type: Sequelize.DATE,
              },
              user_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                  model: "tbl_users",
                  key: "id",
                },
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
