"use strict";
const { Model } = require("sequelize");
const { tableNames, currencies } = require("../../consts");
const faker = require("faker")

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

    static FAKE(count){
      let rows = [],
        result = {},
        index = 0;
      let generateFakeData = () => {
        let id = faker.datatype.uuid()
        
          
        return {
          id,
          account_no: faker.finance.account(10),
          bank_name: faker.company.companyName(),
          swift_code: faker.finance.iban(),      
          currency: faker.helpers.randomize(Object.keys(currencies)),
          createdAt: faker.datatype.datetime(),
          updatedAt: faker.datatype.datetime(),
          
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
        type: DataTypes.ENUM(Object.keys(currencies)),
        defaultValue: "USD",
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "BankDetail",
      tableName: tableNames?.BANK_DETAIL || "tbl_bank_details",
      underscored: true,
    }
  );
  return BankDetail;
};
