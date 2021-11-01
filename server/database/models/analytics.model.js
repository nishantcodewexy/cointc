"use strict";
const { Model } = require("sequelize");
const { tableNames } = require("../../consts");

module.exports = (sequelize, DataTypes) => {
  class Analytics extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Analytics.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      user: {
        type: DataTypes.JSON,
      },
      wallet: { type: DataTypes.JSON },
      support_ticket: { type: DataTypes.JSON },
      kyc: { type: DataTypes.JSON },
      security: { type: DataTypes.JSON },
    },
    {
      sequelize,
      modelName: "Analytics",
      tableName: tableNames?.ANALYTICS || "tbl_analytics",
      underscored: true,
    }
  );
  return Analytics;
};
