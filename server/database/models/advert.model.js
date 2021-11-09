"use strict";
const { Model } = require("sequelize");
const { tableNames } = require("../../consts");
const faker = require("faker");
const { currencies, walletTypes } = require("../../consts");
const hooks = require("../hooks/advert.hook");

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
      Advert.belongsTo(User, { foreignKey: "user_id" });

      Advert.hasMany(Order, {
        as: "orders",
        foreignKey: {
          name: "advert_id",
          allowNull: false,
        },
      });
    }

    static FAKE(count = 0) {
      let rows = [],
        result = {},
        index = 0;
      let generateFakeData = () => {
        let user_id = faker.datatype.uuid();
        let { User } = sequelize?.models;
        return {
          id: faker.datatype.uuid(),
          user_id,
          min_order_qty: faker.datatype.number(20),
          max_order_qty: faker.datatype.number(100),
          min_order_price: faker.datatype.float(2),
          max_order_price: faker.datatype.float(2),
          payment_methods: faker.helpers.randomize(["wechat", "alipay"]),
          type: faker.helpers.randomize(["buy", "sell"]),
          payment_ttl_mins: faker.datatype.number(),
          price: faker.datatype.float(),
          floating_price: faker.datatype.float(),
          total_qty: faker.datatype.number(),
          available_qty: faker.datatype.number(),
          fiat: faker.finance.currencyCode(),
          crypto: faker.helpers.randomize(Object.values(walletTypes)),
          remarks: faker.lorem.sentence(),
          auto_reply_message: faker.lorem.sentence(),
          trade_conditions: faker.lorem.sentence(),
          published: faker.datatype.boolean(),
          archived_at: null,
          createdAt: faker.datatype.datetime(),
          updatedAt: faker.datatype.datetime(),
          total_orders: faker.datatype.number(),
          total_completed_orders: faker.datatype.number(),
          user: User.FAKE(),
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
      payment_ttl_mins: {
        type: DataTypes.INTEGER,
        defaultValue: -1,
        validate: {
          isInt: true,
        },
        comment: "Time limit in minutes within which order should be completed",
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
      total_qty: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 1,
        validate: {
          isInt: true,
        },
      },
      available_qty: {
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
        allowNull: false,
        get() {
          return String(this.get("crypto"))?.toUpperCase();
        },
      },
      fiat: {
        type: DataTypes.STRING,
        comment: "Kind of fiat currency",
        allowNull: false,
        get() {
          return String(this.get("fiat"))?.toUpperCase();
        },
        set(value) {
          this.setDataValue("fiat", String(value)?.toUpperCase());
        }
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
      hooks,
    }
  );

  return Advert;
};
