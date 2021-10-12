"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const { Chat, Message, User } = models;
      // Message.belongsTo(User, {});
      Chat.Messages = Message.belongsTo(Chat, {});
    }
  }
  Message.init(
    {
      sender_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      read: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: "Message",
      underscored: true,
      tableName: "tbl_chat_messages",
    }
  );
  return Message;
};
