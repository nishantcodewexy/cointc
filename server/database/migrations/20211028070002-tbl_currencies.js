"use strict";

let table_name = "tbl_currencies";

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

              name: {
                type: Sequelize.STRING,
                unique: true,
              },
              iso_code: {
                type: Sequelize.STRING,
                unique: true,
              },
              type: {
                type: Sequelize.ENUM("fiat", "crypto"),
                defaultValue: "crypto",
              },
              created_at: Sequelize.DATE,
              updated_at: Sequelize.DATE,
              archived_at: Sequelize.DATE,
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
