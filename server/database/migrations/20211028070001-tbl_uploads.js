"use strict";
const {
  mimeTypes,
  FILE_UPLOAD_PATH,
} = require("../../consts");

let { tableNames } = require("../../consts");
let table_name = tableNames.UPLOAD;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Add all table modifications here
      async function modifications(d) {
        await queryInterface.sequelize.transaction(async (t) => {
          return await Promise.all([]);
        });
      }

      // table field definitions
      let fields = {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
        },
        mimetype: {
          type: Sequelize.ENUM(Object.keys(mimeTypes)),
          allowNull: false,
          defaultValue: "unknown",
        },
        original: {
          type: Sequelize.JSON,
          defaultValue: {},
        },
        thumbnail: {
          type: Sequelize.JSON,
          defaultValue: {},
        },
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,
        description: Sequelize.STRING,
        user_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: { model: tableNames?.USER || 'tbl_users', key: "id" },
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
