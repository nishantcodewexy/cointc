"use strict";
const { Model } = require("sequelize");
const { countries, tableNames } = require("../../consts");

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
