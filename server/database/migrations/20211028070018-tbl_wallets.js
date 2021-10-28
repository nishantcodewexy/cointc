"use strict";

let table_name = "tbl_wallets";

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
