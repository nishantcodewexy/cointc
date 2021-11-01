"use strict";
const { KycStatusType, tableNames } = require("../../consts");

let table_name = tableNames?.KYC || "tbl_kyc";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Table fields or columns definition
      let fields = {
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
            model: tableNames.UPLOAD,
            key: "id",
          },
        },
        user_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: { model: tableNames?.USER || "tbl_users", key: "id" },
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
