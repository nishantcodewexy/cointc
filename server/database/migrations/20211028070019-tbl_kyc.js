"use strict";
const {
  types: { KycStatusType },
} = require("../../consts");

let table_name = "tbl_kyc";

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
              type: Sequelize.ENUM("email", "id", "sms"),
              status: {
                type: Sequelize.ENUM(Object.keys(KycStatusType)),
                allowNull: false,
                defaultValue: KycStatusType.PENDING,
              },
              created_at: Sequelize.DATE,
              updated_at: Sequelize.DATE,
              archived_at: Sequelize.DATE,
              document_id: {
                type: Sequelize.UUID,
                references: {
                  model: "tbl_uploads",
                  key: "id",
                },
              },
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
