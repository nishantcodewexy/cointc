"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BankDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BankDetail.init(
    {
      
      short_name: DataTypes.STRING,
      eth_address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Asset",
      tableName: "tbl_assets",
      underscored: true,
    }
  );
  return BankDetail;
};
