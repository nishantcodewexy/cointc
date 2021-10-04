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
      console.log({ to, from });
      return [to.replace(/-/g, ""), from.replace(/-/g, "")].sort().join("-");
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
      tableName: "tbl_chats",
      hooks: {
        beforeCreate(model, options) {
          const { to, from } = model;
          let hash = Chat.makeHash(to, from);
          model.inboxHash = hash;
        },
      },
    }
  );
  return Chat;
};
