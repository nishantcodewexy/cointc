"use strict";
const { Model } = require("sequelize");
const _ = require("underscore");
const hooks = require('../hooks/user.hook');


// debugger;

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const { Profile, User, AdminProfile, Wallet /* Message */ } = models;
      User.hasOne(Profile, {
        foreignKey: "user_id",
        as: "profile",
      });

      User.hasOne(AdminProfile, {
        foreignKey: "user_id",
        as: "admin_profile",
      });

      User.hasMany(Wallet, {
        foreignKey: "owner_id",
        // as: "wallet",
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
        type: DataTypes.ENUM(["basic", "admin"]),
        defaultValue: "basic",
      },
      permission: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      archived_at: DataTypes.DATE,
      last_seen: DataTypes.DATE,
      login_at: DataTypes.DATE,
      
    },
    {
      sequelize,
      modelName: "User",
      underscored: true,
      tableName: "tbl_users",
      paranoid: true,
      deletedAt: "archived_at",
      hooks
    }
  );

  return User;
};
