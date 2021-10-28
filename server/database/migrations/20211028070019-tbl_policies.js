"use strict";

let table_name = "tbl_policies";

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
              escrow_fee: Sequelize.DOUBLE,
              maker_ad_fee: Sequelize.DOUBLE,
              taker_ad_fee: Sequelize.DOUBLE,
              min_confirmation_block: {
                type: Sequelize.INTEGER,
              },
              created_at: Sequelize.DATE,
              updated_at: Sequelize.DATE,
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
