"use strict";

let table_name = "tbl_escrows";

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
              fiat_amount_in_hold: {
                type: Sequelize.DOUBLE,
                allowNull: false,
                validate: {
                  min: 0,
                  isInt: true,
                },
              },
              fee: {
                type: Sequelize.DOUBLE,
                allowNull: false,
                validate: {
                  min: 0,
                  isInt: true,
                },
              },
              created_at: Sequelize.DATE,
              updated_at: Sequelize.DATE,
              seller_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: { model: "tbl_users", key: "id" },
              },
              order_id: {
                type: Sequelize.STRING,
                allowNull: false,
                references: { model: "tbl_orders", key: "id" },
              },
              buyer_id: {
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
