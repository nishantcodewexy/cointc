"use strict";
const { Model } = require("sequelize");
const { tableNames } = require("../../consts");
const faker = require("faker");
const { currencies, walletTypes } = require("../../consts");

module.exports = (sequelize, DataTypes) => {
  class Fee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Fee }) {
      Fee.belongsTo(User, {
        foreignKey: {
          name: "user_id",
        },
      });
    }

    static FAKE(count) {
      let rows = [],
        result = {},
        index = 0;
      let generateFakeData = () => {
        return {
          fiat: faker.helpers.randomize(Object.keys(currencies)),
          crypto: faker.helpers.randomize(Object.keys(walletTypes)),
          rate: faker.datatype.float(),
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

  Fee.init(
    {
      fiat: DataTypes.STRING,
      crypto: DataTypes.INTEGER,
      rate: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: "Fee",
      underscored: true,
      tableName: tableNames?.FEE || "tbl_fees",
    }
  );
  return Fee;
};
