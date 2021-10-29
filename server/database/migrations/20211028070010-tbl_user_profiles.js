"use strict";

let { tableNames } = require("../../consts");
let table_name = tableNames?.PROFILE || 'tbl_user_profiles';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      //  Add all table modifications here
      async function modifications(d) {
        await queryInterface.sequelize.transaction(async (t) => {
          return await Promise.all([
            !("date_of_birth" in d) &&
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
            !("phone" in d) &&
              queryInterface.addColumn(
                table_name,
                "phone", // new field name
                {
                  type: Sequelize.STRING,
                },
                {
                  transaction: t,
                }
              ),
            !("kyc_id" in d) &&
              queryInterface.addColumn(
                table_name,
                "kyc_id", // new field name
                {
                  type: Sequelize.UUID,
                  references: {
                    model: tableNames?.KYC || "tbl_kyc",
                    key: "id",
                  },
                },
                {
                  transaction: t,
                }
              ),
            !("address_id" in d) &&
              queryInterface.addColumn(
                table_name,
                "address_id", // new field name
                {
                  type: Sequelize.UUID,
                  references: {
                    model: tableNames?.ADDRESS || "tbl_addresses",
                    key: "id",
                  },
                },
                {
                  transaction: t,
                }
              ),
            !("avatar_upload" in d) &&
              queryInterface.addColumn(
                table_name,
                "avatar_upload", // new field name
                {
                  type: Sequelize.UUID,
                  references: {
                    model: tableNames?.UPLOAD || "tbl_uploads",
                    key: "id",
                  },
                },
                {
                  transaction: t,
                }
              ),
          ]);
        }).catch(console.error);
      }

      // table field definitions
      let fields = {
        profile_id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
        },
        mode: {
          type: Sequelize.ENUM,
          values: ["standard"],
          comment: "User mode state: [standard, merchant]",
        },
        invite_code: {
          type: Sequelize.STRING,
        },
        suitability: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
          validate: {
            min: 0,
            max: 5,
          },
        },
        payment_methods: Sequelize.JSON,
        pname: { type: Sequelize.STRING, comment: "public name" },
        lname: {
          type: Sequelize.STRING,
          comment: "last name",
          allowNull: false,
        },
        oname: {
          type: Sequelize.STRING,
          comment: "other names",
          allowNull: false,
        },
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,
        archived_at: Sequelize.DATE,
        user_id: {
          type: Sequelize.UUID,
          references: { model: tableNames?.USER || 'tbl_users', key: "id" },
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
          validate: {
            notEmpty: true,
            isEmail: true,
          },
          references: {
            model: tableNames?.USER || 'tbl_users',
            key: "email",
          },
        },
      };

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
