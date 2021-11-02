"use strict";
const { Model } = require("sequelize");
const { tableNames } = require("../../consts");
const faker = require("faker");
const {currencies,walletTypes} = require("../../consts")

module.exports = (sequelize, DataTypes) => {
  class Advert extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static total = 0;
    static associate(models) {
      // define association here
      const { Advert, Order, User } = models;
      Advert.belongsTo(User);

      Advert.hasMany(Order, {
        as: "orders",
        foreignKey: {
          name: "advert_id",
          allowNull: false,
        },
      });
    }

    static FAKE(count){
      let rows = [],
        result = {},
        index = 0;
      let generateFakeData = () => {
        let id = faker.datatype.uuid()
        
          
        return {
          id,
          user_id: faker.datatype.uuid(),
          min_order_qty: faker.datatype.number(20),
          max_order_qty: faker.datatype.number(100),
          min_order_price: faker.datatype.float(2),
          max_order_price: faker.datatype.float(2),
          payment_methods: faker.commerce.department(),
          type: faker.helpers.randomize(["buy","sell"]),
          payment_time_limit: faker.datatype.number(),
          price: faker.datatype.float(),
          floating_price: faker.datatype.float(),
          qty: faker.datatype.number(),
          crypto: faker.helpers.randomize(Object.values(walletTypes)),
          fiat: faker.helpers.randomize(Object.values(currencies)),
          remarks: faker.lorem.sentence(),
          auto_reply_message: faker.lorem.sentence(),
          trade_conditions: faker.lorem.sentence(),
          published: faker.datatype.boolean(),
          archived_at: null,
          
        };
      };
      if (count > 1) {
        for (; index < count; ++index) {
          rows.push(generateFakeData());
        }
        result = { count, rows };
      } else result = { ...generateFakeData() };
      return result;
    }
  }

  Advert.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      user_id: DataTypes.UUID,
      min_order_qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          isInt: true,
        },
      },
      max_order_qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          isInt: true,
        },
      },
      min_order_price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
          min: 0,
          isInt: true,
        },
        comment: "Best price for a sell ad",
      },
      max_order_price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
          min: 0,
          isInt: true,
        },
        comment: "Best price for buy ad",
      },
      payment_methods: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM("buy", "sell"),
        allowNull: false,
        comment:
          "Advert type where a buyer ad requires a seller to initiate an order. A seller ad requires a buyer to inititate an order",
      },
      payment_time_limit: {
        type: DataTypes.INTEGER,
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
        type: DataTypes.DOUBLE,
      },
      floating_price: {
        type: DataTypes.DOUBLE,
        comment: "(80 - 200%) Price = market_price * currency * floating_price",
      },
      qty: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 1,
        validate: {
          isInt: true,
        },
      },
      crypto: {
        type: DataTypes.STRING,
        comment: "Kind of crypto currency",
        allowNull: false
      },
      fiat: {
        type: DataTypes.STRING,
        comment: "Kind of fiat currency",
        allowNull: false
      },
      remarks: DataTypes.STRING(255),
      auto_reply_message: {
        type: DataTypes.STRING(255),
        comment: "Message to be sent after order is placed",
      },
      trade_conditions: {
        type: DataTypes.STRING(400),
        comment: "Trade conditions",
      },
      published: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN,
        comment: "Indicates whether advert is published or not",
      },
      archived_at: {
        type: DataTypes.DATE,
        comment: "Indicates whether a record is soft deleted or not",
      },
    },
    {
      sequelize,
      modelName: "Advert",
      underscored: true,
      tableName: tableNames?.ADVERT || "tbl_adverts",
      paranoid: true,
      deletedAt: "archived_at",
    }
  );

  Advert.addHook("afterFind", async (findResult, options) => {
    if (!findResult) return;
    if (!Array.isArray(findResult)) findResult = [findResult];
    for (const instance of findResult) {
      if (!(instance instanceof Advert)) return;

      let orders = await instance.getOrders();
      let completed_orders = await instance.getOrders({
        where: { status: "completed" },
      });
      if (instance)
        instance.dataValues = {
          total_orders: orders.length,
          total_completed_orders: completed_orders.length,
          ...instance?.dataValues,
        };
    }
  });
  return Advert;
};
