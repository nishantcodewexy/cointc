"use strict";

let { tableNames } = require("../../consts");
let table_name = tableNames?.ORDER || 'tbl_orders';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Add table modifications here
      async function modifications(d) {
        await queryInterface.sequelize.transaction(async (t) => {
          return await Promise.all([
            "from_user_id" in d &&
              queryInterface.renameColumn(
                table_name,
                "from_user_id",
                "user_id",
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
          type: Sequelize.STRING,
          primaryKey: true,
          defaultValue: () => {
            return `ORD-${Date.now().toString()}`;
          },
        },
        total_amount: {
          type: Sequelize.DOUBLE,
          allowNull: false,
          validate: {
            min: 0,
            isInt: true,
          },
        },
        total_quantity: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 1,
        },
        appeal: Sequelize.STRING,
        remark: Sequelize.STRING,
        status: {
          type: Sequelize.ENUM(
            "unpaid",
            "paid",
            "released",
            "completed",
            "disputed",
            "cancelled"
          ),
          defaultValue: "unpaid",
        },
        rating: {
          type: Sequelize.INTEGER,
          validate: {
            isInt: true,
            min: 0,
            max: 5,
          },
          allowNull: true,
        },
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,
        archived_at: Sequelize.DATE,
        trx_id: Sequelize.STRING,
        user_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: { model: tableNames?.USER || 'tbl_users', key: "id" },
        },
        advert_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: { model: tableNames?.ADVERT || 'tbl_adverts', key: "id" },
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
