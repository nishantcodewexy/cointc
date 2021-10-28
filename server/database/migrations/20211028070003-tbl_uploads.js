"use strict";
const {
  types: { MimeType },
  FILE_UPLOAD_PATH,
} = require("../../consts");

let table_name = "tbl_uploads";

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
              mimetype: {
                type: Sequelize.STRING,
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
