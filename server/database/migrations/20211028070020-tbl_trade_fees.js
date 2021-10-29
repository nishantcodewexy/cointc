"use strict";
let { tableNames } = require("../../consts");
let table_name = tableNames?.FEE || 'tbl_fees';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Table fields or columns definition
      let fields = {
        fiat: Sequelize.STRING,
        crypto: Sequelize.INTEGER,
        rate: Sequelize.DOUBLE,
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,
        user_id: {
          type: Sequelize.UUID,
          // allowNull: false,
          references: { model: tableNames?.USER || 'tbl_users', key: "id" },
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
