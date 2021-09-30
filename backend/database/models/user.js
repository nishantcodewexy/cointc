"use strict";
const { Model } = require("sequelize");
const _ = require("underscore");
const { encrypt } = require("../../helpers");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const { Profile, User, Message } = models;
      User.hasOne(Profile, {
        foreignKey: "user_id",
        as: "profile",
      });
      // User.hasMany(Message, {})
    }
    toPublic() {
      return _.omit(this.toJSON(), ["password"]);
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      role: {
        type: DataTypes.ENUM(["standard", "admin"]),
        defaultValue: "standard",
      },
      archived_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "User",
      underscored: true,
      tableName: "tbl_users",
      paranoid: true,
      deletedAt: "archived_at",
      hooks: {
        async beforeCreate(model, options) {
          model.password = await encrypt(model.password);
        },
      },
    }
  );

  return User;
};
