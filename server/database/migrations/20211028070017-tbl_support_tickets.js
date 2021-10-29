"use strict";
const { TicketSubjectType, TicketStatusType, tableNames } = require("../../consts");
let table_name = tableNames?.SUPPORT_TICKET || 'tbl_support_tickets';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Table fields
      let fields = {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
        },
        severity: {
          type: Sequelize.ENUM(Object.keys(TicketSubjectType)),
          allowNull: false,
          defaultValue: TicketSubjectType.LOW,
        },
        subject: {
          type: Sequelize.STRING,
          defaultValue: "<No subject>",
        },
        description: {
          type: Sequelize.STRING,
          defaultValue: "<No description>",
        },
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
          references: { model: tableNames?.USER || 'tbl_users', key: "id" },
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
