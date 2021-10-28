"use strict";
const {
  types: { currencies },
} = require("../../consts");

let table_name = "tbl_bank_details";

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
              account_no: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
              },

              bank_name: {
                type: Sequelize.STRING,
              },
              swift_code: {
                type: Sequelize.STRING,
                validate: {
                  min: 8,
                  max: 11,
                },
                allowNull: false,
              },
              currency: {
                type: Sequelize.ENUM(...Object.keys(currencies)),
                defaultValue: "USD",
                allowNull: false,
              },
              created_at: Sequelize.DATE,
              updated_at: Sequelize.DATE,
              user_id: {
                allowNull: false,
                type: Sequelize.UUID,
                references: { model: "tbl_users", key: "id" },
              },
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
