"use strict";
const {
  types: { currencies },
} = require("../../consts");

let table_name = "tbl_bank_details";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
          // Table field definitions
          let fields = {
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
          };

          // Add table modifications here
          async function modifications(d) {
            await queryInterface.sequelize.transaction(async (t) => {
              return await Promise.all([]);
            });
          }

          // Check if table exist and apply modifications else create and apply modifications
          await queryInterface
            .describeTable(table_name)
            .then(modifications)
            .catch(async () => {
              await queryInterface.createTable(table_name, fields);
              let dfns = await queryInterface.describeTable(table_name);
              modifications(dfns);
            });
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
