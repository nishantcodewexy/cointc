"use strict";
const { Model } = require("sequelize");
const { tableNames } = require("../../consts");

module.exports = (sequelize, DataTypes) => {
  class Policy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Policy}) {
      // define association here
      Policy.belongsTo(User, {
        foreignKey: {
          name: 'user_id'
        }
      })
    }
  }
  Policy.init(
    {
      escrow_fee: DataTypes.DOUBLE,
      buyer_ad_fee: DataTypes.DOUBLE,
      seller_ad_fee: DataTypes.DOUBLE,
      min_confirmation_block: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Policy",
      underscored: true,
      tableName: tableNames?.POLICY || "tbl_policies",
    }
  );

  return Policy;
};
