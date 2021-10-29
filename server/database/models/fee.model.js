"use strict";
const { Model } = require("sequelize");
const { tableNames } = require('../../consts');

module.exports = (sequelize, DataTypes) => {
  class Fee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Fee}) {
      Fee.belongsTo(User, {
        foreignKey: {
          name: 'user_id'
        }
      })
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
