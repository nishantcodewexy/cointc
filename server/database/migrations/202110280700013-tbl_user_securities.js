"use strict";
let { tableNames } = require("../../consts");
let table_name = tableNames?.SECURITY || 'tbl_user_securities';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Add all modifications here
      async function modifications(d) {
        await queryInterface.sequelize.transaction(async (t) => {
          return await Promise.all([]);
        });
      }

      // Table field definitions
      let fields = {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
        },
        otp: {
          type: Sequelize.STRING,
        },
        otp_ttl: Sequelize.DATE,
        two_factor: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        verify_token: Sequelize.STRING,
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,
        verify_token_ttl: { type: Sequelize.DATE },
        user_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: { model: tableNames?.USER, key: "id" },
        },
      };

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
