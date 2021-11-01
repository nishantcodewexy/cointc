"use strict";
let { tableNames } = require("../../consts");
let table_name = tableNames?.ADVERT || "adverts";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Add all table modifications here
      async function modifications(d) {
        await queryInterface.sequelize.transaction(async (t) => {
          return await Promise.all([
            "crypto_currency" in d &&
              queryInterface.renameColumn(
                table_name,
                "crypto_currency",
                "crypto",
                { transaction: t }
              ),
            "fiat_currency" in d &&
              queryInterface.renameColumn(table_name, "fiat_currency", "fiat", {
                transaction: t,
              }),
          ]);
        });
      }

      // Table field definitions
      let fields = {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
        },
        min_order_qty: {
          type: Sequelize.INTEGER,
          allowNull: false,
          validate: {
            min: 0,
            isInt: true,
          },
        },
        max_order_qty: {
          type: Sequelize.INTEGER,
          allowNull: false,
          validate: {
            min: 0,
            isInt: true,
          },
        },
        min_order_price: {
          type: Sequelize.DOUBLE,
          allowNull: false,
          validate: {
            min: 0,
            isInt: true,
          },
          comment: "Best price for a sell ad",
        },
        max_order_price: {
          type: Sequelize.DOUBLE,
          allowNull: false,
          validate: {
            min: 0,
            isInt: true,
          },
          comment: "Best price for buy ad",
        },
        payment_methods: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        type: {
          type: Sequelize.ENUM("buy", "sell"),
          allowNull: false,
          comment:
            "Advert type where a buyer ad requires a seller to initiate an order. A seller ad requires a buyer to inititate an order",
        },
        payment_time_limit: {
          type: Sequelize.INTEGER,
          defaultValue: -1,
          validate: {
            isInt: true,
          },
          comment: "Time limit within which buyer should complete trade",
        },
        price: {
          validate: {
            notEmpty: true,
          },
          type: Sequelize.DOUBLE,
        },
        floating_price: {
          type: Sequelize.DOUBLE,
          comment:
            "(80 - 200%) Price = market_price * currency * floating_price",
        },
        qty: {
          allowNull: false,
          type: Sequelize.INTEGER,
          defaultValue: 1,
          validate: {
            isInt: true,
          },
        },
        crypto: {
          type: Sequelize.STRING,
          comment: "Kind of crypto currency",
          allowNull: false,
        },
        fiat: {
          type: Sequelize.STRING,
          comment: "Kind of fiat currency",
          allowNull: false,
        },
        remarks: Sequelize.STRING(255),
        auto_reply_message: {
          type: Sequelize.STRING(255),
          comment: "Message to be sent after order is placed",
        },
        trade_conditions: {
          type: Sequelize.STRING(400),
          comment: "Trade conditions",
        },
        published: {
          allowNull: false,
          defaultValue: false,
          type: Sequelize.BOOLEAN,
          comment: "Indicates whether advert is published or not",
        },
        archived_at: {
          type: Sequelize.DATE,
          comment: "Indicates whether a record is soft deleted or not",
        },
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,
        user_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: { model: tableNames?.USER || "users", key: "id" },
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
