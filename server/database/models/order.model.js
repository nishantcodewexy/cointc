"use strict";
const { Model } = require("sequelize");
const hooks = require("../hooks/order.hook");
const { tableNames } = require("../../consts");
const faker = require("faker");
const STATUS = {
  pending: "PENDING",
  completed: "COMPLETED",
  disputed: "DISPUTED",
  cancelled: "CANCELLED",
};

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const { Order, Advert, User } = models;
      Order.belongsTo(Advert, {
        foreignKey: "advert_id",
      });
      Order.belongsTo(User);
    }

    static FAKE(count) {
      let rows = [],
        result = {},
        index = 0;
      let generateFakeData = () => {
        let { User, Advert } = sequelize?.models;
        return {
          id: `ORD-${Date.now().toString()}`,
          total_amount: faker.datatype.float(),
          total_quantity: faker.datatype.number(),
          advert_user_confirm: faker.datatype.number(),
          order_user_confirm: faker.datatype.number(),
          blocked_account_id: faker.datatype.uuid(),
          appeal: faker.lorem.sentence(),
          remark: faker.lorem.sentence(),
          status: faker.helpers.randomize(Object.values(STATUS)),
          rating: faker.datatype.number(5),
          archived_at: faker.datatype.datetime(),
          trx_id: faker.datatype.uuid(),
          createdAt: faker.datatype.datetime(),
          updatedAt: faker.datatype.datetime(),
          user: User.FAKE(),
          advert: Advert.FAKE(),
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
      advert_user_confirm: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      order_user_confirm: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      blocked_account_id: DataTypes.UUID,
      appeal: DataTypes.STRING,
      remark: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM(Object.values(STATUS)),
        defaultValue: STATUS.pending,
      },
      rating: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: true,
          min: 0,
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
      tableName: tableNames?.ORDER || "tbl_orders",
      hooks,
      deletedAt: "archived_at",
    }
  );
  return Order;
};
