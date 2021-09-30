"use strict";
const { Model } = require("sequelize");
const crypto = require("crypto");

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
      return crypto
        .createHash("md5")
        .update([to, from].sort().join(""))
        .digest("hex");
    }
  }
  Chat.init(
    {
      id: {
        type: DataTypes.STRING,
        unique: true,
        primaryKey: true,
      },
      to: {
        type: DataTypes.VIRTUAL,
      },
      from: {
        type: DataTypes.VIRTUAL,
      },
      inboxHash: {
        type: DataTypes.STRING,
        unique: true,
        set() {
          const to = this.getDataValue("to");
          const from = this.getDataValue("from");
          let hash = Chat.makeHash(to, from);
          return this.setDataValue("id", hash);
        },
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
