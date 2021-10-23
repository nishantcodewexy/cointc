"use strict";
const { Model } = require("sequelize");
const {
  types: { country, banks, currencies },
} = require("../../consts");
module.exports = (sequelize, DataTypes) => {
  class BankDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const { User, BankDetail } = models;

      BankDetail.belongsTo(User, {
        foreignKey: "user_id",
      });
    }
  }
  BankDetail.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      account_no: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
    
      bank_name: {
        type: DataTypes.STRING,
      },
      swift_code: {
        type: DataTypes.STRING,
        validate: {
          min: 8,
          max: 11
        },
        allowNull: false
      },      
      currency: {
        type: DataTypes.ENUM(...Object.keys(currencies)),
        defaultValue: "USD",
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "BankDetail",
      tableName: "tbl_bank_details",
      underscored: true,
    }
  );
  return BankDetail;
};
