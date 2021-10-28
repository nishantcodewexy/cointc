"use strict";
let table_name = "tbl_users_security";

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
