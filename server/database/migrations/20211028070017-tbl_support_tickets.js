"use strict";
const {
  types: { TicketSubjectType, TicketStatusType },
} = require("../../consts");
let table_name = "tbl_support_tickets";

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
        .catch(async (err) => {
          let dfn = {
            id: {
              type: Sequelize.UUID,
              primaryKey: true,
              defaultValue: Sequelize.UUIDV4,
            },
            subject: {
              type: Sequelize.ENUM(Object.keys(TicketSubjectType)),
              allowNull: false,
              defaultValue: TicketSubjectType.LOW,
            },
            description: Sequelize.STRING,
            status: {
              type: Sequelize.ENUM(Object.keys(TicketStatusType)),
              allowNull: false,
              defaultValue: TicketStatusType.OPEN,
            },
            created_at: Sequelize.DATE,
            updated_at: Sequelize.DATE,
            user_id: {
              type: Sequelize.UUID,
              allowNull: false,
              references: { model: "tbl_users", key: "id" },
            },
          };
          await queryInterface.createTable(table_name, dfn);
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
