"use strict";
const {
  types: { KycStatusType },
} = require("../../consts");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let table_name = "tbl_basic_users_profile";
    // await queryInterface.renameTable("tbl_users_profile", table_name);
    let description;

    description = await queryInterface.describeTable(table_name);
    if (description) {
      return await queryInterface.sequelize.transaction(async (t) => {
        return await Promise.all([
          !("suitability" in description) &&
            queryInterface.addColumn(
              "tbl_basic_users_profile",
              "suitability",
              {
                type: Sequelize.INTEGER,
                defaultValue: 0,
              },
              { transaction: t }
            ),

          // "email" in description &&
          //   queryInterface.removeColumn(table_name, "email", {
          //     transaction: t,
          //   }),

          !("profile_pic" in description) &&
            queryInterface.addColumn(
              table_name,
              "profile_pic", // new field name
              {
                type: Sequelize.UUID,
                references: {
                  model: {
                    tableName: "tbl_uploads",
                  },
                  key: "id",
                },
              },
              {
                transaction: t,
              }
            ),

          !("kyc_document" in description) &&
            queryInterface.addColumn(
              table_name,
              "kyc_document", // new field name
              {
                type: Sequelize.UUID,
                references: {
                  model: {
                    tableName: "tbl_uploads",
                  },
                  key: "id",
                },
              },
              {
                transaction: t,
              }
            ),

          !("kyc_status" in description) &&
            queryInterface.addColumn(
              table_name,
              "kyc_status", // new field name
              {
                type: Sequelize.ENUM(Object.keys(KycStatusType)),
                defaultValue: KycStatusType.PENDING,
              },
              {
                transaction: t,
              }
            ),

          !("date_of_birth" in description) &&
            queryInterface.addColumn(
              table_name,
              "date_of_birth", // new field name
              {
                type: Sequelize.DATE,
              },
              {
                transaction: t,
              }
            ),

          !("last_name" in description) &&
            queryInterface.addColumn(
              table_name,
              "last_name", // new field name
              {
                type: Sequelize.STRING,
              },
              {
                transaction: t,
              }
            ),

          !("other_names" in description) &&
            queryInterface.addColumn(
              table_name,
              "other_names", // new field name
              {
                type: Sequelize.STRING,
              },
              {
                transaction: t,
              }
            ),

          "id" in description &&
            queryInterface.renameColumn(table_name, "id", "profile_id"),

          !("country" in description) &&
            queryInterface.addColumn(
              table_name,
              "country", // new field name
              {
                type: Sequelize.STRING,
                defaultValue: "",
              },
              {
                transaction: t,
              }
            ),
        ]);
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.dropTable("tbl_basic_users_profile", {
          transaction: t,
        }),
      ]);
    });
  },
};
