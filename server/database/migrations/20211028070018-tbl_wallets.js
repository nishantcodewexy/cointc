"use strict";
const { tableNames, walletTypes } = require("../../consts");
let table_name = tableNames?.WALLET || "tbl_wallets";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Table fields
      let fields = {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
        },
        account_id: Sequelize.STRING,
        derivation_key: Sequelize.INTEGER,
        address: Sequelize.STRING,
        frozen: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        currency: {
          type: Sequelize.ENUM(Object.keys(walletTypes)),
          allowNull: false /* 
          defaultValue: walletTypes.BTC, */,
        },
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,
        user_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: { model: tableNames?.USER || "tbl_users", key: "id" },
        },
      };

      // Add table modifications here
      async function modifications(d) {
        await queryInterface.sequelize.transaction(async (t) => {
          return await Promise.all([
            "asset" in d &&
              queryInterface.renameColumn(table_name, "asset", "currency", {
                transaction: t,
              }),
            !("derivation_key" in d) &&
              queryInterface.addColumn(
                table_name,
                "derivation_key",
                { type: DataTypes.INTEGER },
                {
                  transaction: t,
                }
              ),
            !("address" in d) &&
              queryInterface.addColumn(
                table_name,
                "address",
                { type: DataTypes.STRING },
                {
                  transaction: t,
                }
              ),
          ]);
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
