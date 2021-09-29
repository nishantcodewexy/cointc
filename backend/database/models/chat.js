"use strict";
const { Model } = require("sequelize");
const { uniqueId } = require("underscore");
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
  }
  Chat.init(
    {
      id: {
        type: DataTypes.STRING,
        unique: true,
        primaryKey: true,
        set() {
          const to = this.getDataValue("to");
          const from = this.getDataValue("from");
          return this.setDataValue("id", `${from}-${to}`);
        },
      },
      to: {
        type: DataTypes.VIRTUAL,
      },
      from: {
        type: DataTypes.VIRTUAL,
      },
    },
    {
      sequelize,
      modelName: "Chat",
      underscored: true,
      tableName: "tbl_chats",
    }
  );
  return Chat;
};
