"use strict";
const { Model } = require("sequelize");
const hooks = require("../hooks/transaction.hook");
const { tableNames } = require("../../consts");
const faker = require("faker");
const TYPE = {
  trade: "TRADE",
  withdraw: "WITHDRAW",
  deposit: "DEPOSIT",
};

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const { Transaction, User } = models;
    }

    static FAKE(count) {
      let rows = [],
        result = {},
        index = 0;
      let generateFakeData = () => {
        let { User, Advert } = sequelize?.models;
        return {
          id: faker.datatype.uuid(),
          type: faker.helpers.randomize(Object.values(TYPE)),
          trx_id: faker.datatype.uuid(),
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

  Transaction.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: () => {
          return `ORD-${Date.now().toString()}`;
        },
      },
      archived_at: DataTypes.DATE,
      trx_id: DataTypes.STRING,
      type: {
        type: DataTypes.ENUM(Object.values(TYPE)),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Transaction",
      underscored: true,
      paranoid: true,
      tableName: tableNames?.TRANSACTION || "tbl_trxs",
      hooks,
      deletedAt: "archived_at",
    }
  );
  return Transaction;
};
