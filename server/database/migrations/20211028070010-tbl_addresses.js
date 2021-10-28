"use strict";
let table_name = "tbl_addresses";

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
              country: {
                type: Sequelize.STRING,
              },
              address_line: {
                type: Sequelize.STRING,
              },
              region: {
                type: Sequelize.STRING,
              },
              created_at: Sequelize.DATE,
              updated_at: Sequelize.DATE,
              /*     user_id: {
                references: { model: "tbl_users", key: "id" },
              }, */
            })
        );
    } catch (error) {
      console.error(error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.dropTable(table_name, {
          transaction: t,
        }),
      ]);
    });
  },
};
