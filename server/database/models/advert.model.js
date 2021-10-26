"use strict";
const { tooManyRequests } = require("boom");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Advert extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const { Advert, Currency, Order } = models;
      Advert.belongsTo(Currency, {
        foreignKey: "currency_id",
        allowNull: false,
      });

      Advert.hasMany(Order, {
        foreignKey: {
          name: 'advert_id',
          as: 'orders',
          allowNull: false
        }
      })
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
        type: DataTypes.JSON,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM,
        values: ["buy", "sell"],
        allowNull: false,
        validate: {
          contains: ["buy", "sell"],
        },
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
      crypto_currency: {
        type: DataTypes.STRING,
        comment: "Kind of crypto currency",
      },
      fiat_currency: {
        type: DataTypes.STRING,
        comment: "Kind of fiat currency",
      },
      remarks: DataTypes.STRING,
      auto_reply_message: {
        type: DataTypes.STRING,
        comment: "Message to be sent after order is placed",
      },
      trade_conditions: {
        type: DataTypes.STRING,
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
      tableName: "tbl_adverts",
    }
  );
  return Advert;
};
