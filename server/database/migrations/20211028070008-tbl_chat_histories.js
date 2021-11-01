"use strict";
const { countries, tableNames } = require("../../consts");
let table_name = tableNames?.CHAT_HISTORY || 'tbl_chat_histories';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Table field definitions
      let fields = {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
        },
        visitor_email: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            isEmail: true,
          },
        },
        type: {
          type: Sequelize.ENUM("CHAT"),
          allowNull: false,
          defaultValue: "CHAT",
        },
        country: {
          type: Sequelize.ENUM(Object.keys(countries)),
          // allowNull: false,
          // defaultValue: "CN",
        },
        browser: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        started_at: Sequelize.DATE,
        ended_at: Sequelize.DATE,
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,
      };

      // Add Table modifications here
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
