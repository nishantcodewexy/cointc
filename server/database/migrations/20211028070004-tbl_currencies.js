"use strict";
let { tableNames, currencies } = require("../../consts");
let table_name = tableNames?.CURRENCY || "tbl_currencies";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Add all table modifications here
      async function modifications(d) {
        try {
          await queryInterface.sequelize.transaction(async (t) => {
            return await Promise.all([
              !("image_url" in d) &&
                queryInterface.addColumn(
                  table_name,
                  "image_url",
                  {
                    type: Sequelize.UUID,
                    references: {
                      model: tableNames?.UPLOAD || "tbl_uploads",
                      key: "id",
                    },
                  },
                  { transaction: t }
                ),
            ]);
          });
        } catch (err) {
          console.error(err);
        }
      }

      // table field definitions
      let fields = {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
        },

        name: {
          type: Sequelize.STRING,
          unique: true,
        },
        iso_code: {
          type: Sequelize.ENUM(...Object.keys(currencies)),
          unique: true,
        },
        type: {
          type: Sequelize.ENUM("fiat", "crypto"),
          defaultValue: "crypto",
        },
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,
        archived_at: Sequelize.DATE,
        user_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: { model: tableNames?.USER || "tbl_users", key: "id" },
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
