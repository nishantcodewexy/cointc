"use strict";
let table_name = "tbl_chat_histories";
const {
  types: { country },
} = require("../../consts");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface
        .describeTable(table_name)
        .then(async (d) => {
          await queryInterface.sequelize.transaction(async (t) => {
            return await Promise.all([]);
          });
        })
        .catch(async () => {
          /* Creation */ await queryInterface.createTable(table_name, {
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
              type: Sequelize.ENUM(...Object.keys(country)),
              allowNull: false,
              defaultValue: "NG",
            },
            browser: {
              type: Sequelize.STRING,
              allowNull: false,
            },
            started_at: Sequelize.DATE,
            ended_at: Sequelize.DATE,
            created_at: Sequelize.DATE,
            updated_at: Sequelize.DATE,
          });
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
