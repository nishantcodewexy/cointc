"use strict";
const { Model } = require("sequelize");
const { tableNames } = require("../../consts");
const faker = require("faker")


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

    static FAKE(count){
      let rows = [],
        result = {},
        index = 0;
      let generateFakeData = () => {
        let id = faker.datatype.uuid()
        
          
        return {
          id,
          user: {
          },
          wallet: { 

           },
          support_ticket: { 

           },
          kyc: { 

           },
          security: { 

           }
          
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
