"use strict";
let { tableNames } = require("../../consts");
let table_name = tableNames?.USER || "tbl_users";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Add all table modifications here
      async function modifications(d) {
        await queryInterface.sequelize.transaction(async (t) => {
          return await Promise.all([
            !("created_by" in d) &&
              queryInterface.addColumn(
                table_name,
                "created_by", // new field name
                {
                  type: Sequelize.UUID,
                  references: {
                    model: tableNames?.USER || "tbl_users",
                    key: "id",
                  },
                },
                {
                  transaction: t,
                }
              ),
          ]);
        });
      }

      // Table field definitions
      let fields = {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
          onDelete: "CASCADE",
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
          validate: {
            notEmpty: true,
            isEmail: true,
          },
          onUpdate: "CASCADE",
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        active: { type: Sequelize.BOOLEAN, defaultValue: true },
        permission: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
        },
        archived_at: Sequelize.DATE,
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,
        last_seen: Sequelize.DATE,
        login_at: Sequelize.DATE,
        verified: { type: Sequelize.BOOLEAN, defaultValue: false },
        access_level: {
          type: Sequelize.INTEGER,
          validate: {
            min: 0,
            isInt: true,
            max: 3,
          },
          defaultValue: 1,
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
    await queryInterface.dropTable(table_name);
  },
};
