"use strict";

let table_name = "tbl_wallets";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
          // Table fields
          let fields = {
            mnemonic: Sequelize.STRING,
            mnemonic_index: {
              type: Sequelize.INTEGER,
              defaultValue: 0,
            },
            extended_pub: Sequelize.STRING,
            private_key: Sequelize.STRING,
            address: Sequelize.STRING,
            asset: {
              type: Sequelize.ENUM("BTC", "ETH", "BNB", "XRP", "USDT"),
              allowNull: false,
              defaultValue: "BTC",
            },
            created_at: Sequelize.DATE,
            updated_at: Sequelize.DATE,
            user_id: {
              type: Sequelize.UUID,
              allowNull: false,
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
