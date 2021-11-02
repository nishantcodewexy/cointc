"use strict";
const { Model } = require("sequelize");
const { countries, tableNames } = require("../../consts");
const faker = require("faker")

module.exports = (sequelize, DataTypes) => {
  class ChatHistory extends Model {
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
          visitor_email: faker.internet.email(),
          type: faker.helpers.randomize(["CHAT", "DISPUTE", "SUPPORT"]),
          country: faker.helpers.randomize(Object.keys(countries)),
          browser: faker.name.prefix(),
          started_at: faker.datatype.datetime(),
          ended_at: faker.datatype.datetime(),
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
  ChatHistory.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      visitor_email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      type: {
        type: DataTypes.ENUM("CHAT", "DISPUTE", "SUPPORT"),
        allowNull: false,
        defaultValue: "CHAT",
      },
      country: {
        type: DataTypes.ENUM(Object.keys(countries)),
        allowNull: false,
      },
      browser: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      started_at: DataTypes.DATE,
      ended_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "ChatHistory",
      underscored: true,
      tableName: tableNames?.CHAT_HISTORY || "tbl_chat_histories",
      paranoid: true,
    }
  );
  return ChatHistory;
};
