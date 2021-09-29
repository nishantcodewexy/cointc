"use strict";
const { allow } = require("joi");
const { Model } = require("sequelize");
const { uniqueId } = require("underscore");
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
      Message.belongsTo(User, {});
      Message.belongsTo(Chat, {});
    }
  }
  Message.init(
    {
      id: {
        type: DataTypes.UUID,
        unique: true,
        primaryKey: true,
      },
      to: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      from: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
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
