"use strict";
const { Model } = require("sequelize");
const { tableNames } = require("../../consts");
const faker = require("faker")

module.exports = (sequelize, DataTypes) => {
  class Secession extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const { User, Secession } = models;

      Secession.belongsTo(User);
    }

    static FAKE(count){
      let rows = [],
        result = {},
        index = 0;
      let generateFakeData = () => {
        
        
          
        return {
          id: faker.datatype.uuid(),
          access_level: faker.helpers.randomize([1,2,3]),
          status: faker.helpers.randomize(["accepted", "denied", "pending"]),
          description: faker.lorem.sentence(),
          approval_date: faker.datatype.datetime(),
          archived_at: faker.datatype.datetime(),
          
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
  Secession.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      access_level: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          isInt: true,
          max: 3,
        },
        defaultValue: 1,
      },
      status: {
        type: DataTypes.ENUM(["accepted", "denied", "pending"]),
        allowNull: false,
        defaultValue: "pending",
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      approval_date: DataTypes.DATE,
      archived_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Secession",
      underscored: true,
      tableName: tableNames?.SECESSION || "tbl_secessions",
    }
  );
  return Secession;
};
