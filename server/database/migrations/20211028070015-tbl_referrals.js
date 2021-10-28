"use strict";

let table_name = "tbl_referrals";

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
              commission: {
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
                  model: "tbl_users",
                  key: "id",
                },
              },
              user_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                  model: "tbl_users",
                  key: "id",
                },
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
