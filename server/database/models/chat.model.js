"use strict";
const { Model } = require("sequelize");
const hooks = require("../hooks/chat.hook");
const { tableNames } = require("../../consts");
const faker = require("faker")

module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const { Chat, Message } = models;
      Chat.hasMany(Message, {});
    }
    static makeHash(to, from) {
      // console.log({ to, from });
      return [to.replace(/-/g, ""), from.replace(/-/g, "")].sort().join("-");
    }


    static FAKE(count){
      let rows = [],
        result = {},
        index = 0;
      let generateFakeData = () => {
        let id = faker.datatype.uuid()
        
          
        return {
          id,
          to: faker.datatype.uuid(),
          from: faker.datatype.uuid(),
          inboxHash: faker.datatype.uuid(),
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

  Chat.init(
    {
      to: {
        type: DataTypes.VIRTUAL,
      },
      from: {
        type: DataTypes.VIRTUAL,
      },
      inboxHash: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Chat",
      underscored: true,
      tableName: tableNames?.CHAT || "tbl_chats",
      hooks,
    }
  );

  return Chat;
};
