"use strict";
const { Model } = require("sequelize");
const hooks = require("../hooks/order.hook");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const { Order, Advert } = models;
      Order.belongsTo(Advert, {
        foreignKey: "advert_id",
      });
    }
  }

  Order.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: () => {
          return `ORD-${Date.now().toString()}`;
        },
      },
      total_amount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
          min: 0,
          isInt: true,
        },
      },
      total_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      appeal: DataTypes.STRING,
      remark: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM(
          "unpaid",
          "paid",
          "released",
          "completed",
          "disputed",
          "canceled"
        ),
        defaultValue: "unpaid",
      },
      rating: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: true,
          min: 1,
          max: 5,
        },
        allowNull: true,
      },
      archived_at: DataTypes.DATE,
      trx_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Order",
      underscored: true,
      paranoid: true,
      tableName: "tbl_orders",
      hooks,
      deletedAt: "archived_at",
    }
  );
  return Order;
};
