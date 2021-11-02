"use strict";
let { tableNames } = require("../../consts");
let table_name = tableNames?.REFERRAL || 'tbl_referrals';

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
            commission_in_percent: {
              type: Sequelize.DOUBLE,
              validate: {
                min: 0,
                max: 100,
              },
              defaultValue: process.env.REFERRAL_COMISSION || 20,
            },
            created_at: Sequelize.DATE,
            updated_at: Sequelize.DATE,
            referred_id: {
              type: Sequelize.UUID,
              allowNull: false,
              references: {
                model: tableNames?.USER || "tbl_users",
                key: "id",
              },
            },
            user_id: {
              type: Sequelize.UUID,
              allowNull: false,
              references: {
                model: tableNames?.USER || "tbl_users",
                key: "id",
              },
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
