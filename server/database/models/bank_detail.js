"use strict";
const { Model } = require("sequelize");
const {
    types:{
        country,
        banks,
        currencies
    }
} = require("../../consts")
module.exports = (sequelize, DataTypes) => {
  class BankDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const {User,BankDetail} = models

      User.hasMany(BankDetail,{
        foreignKey:"user_id"
      })
      BankDetail.belongsTo(User)
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
        type:DataTypes.STRING,
        allowNull:false,
        
      },
      bank_name: {
        type:DataTypes.ENUM(...Object.keys(banks)),
        allowNull:false
      },
      ifsc_code: {
        type:DataTypes.STRING,
        validate:{
            len:10
        }
      },
      country: {
        type:DataTypes.ENUM(...Object.keys(country)),
        allowNull:false
      },
      currency: {
        type:DataTypes.ENUM(...Object.keys(currencies)),
        defaultValue:"USD",
        allowNull:false
      },
      archive_at:DataTypes.DATE
    },
    {
      sequelize,
      modelName: "BankDetail",
      tableName: "tbl_bankdetails",
      underscored: true,
    }
  );
  return BankDetail;
};
