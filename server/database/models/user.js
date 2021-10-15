"use strict";
const { Model } = require("sequelize");
const _ = require("underscore");
const { roles } = require("../../consts");
const hooks = require("../hooks/user.hook");

// debugger;
const uppercaseFirst = (str) => `${str[0].toUpperCase()}${str.substr(1)}`;

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const { BasicProfile, User, AdminProfile, Wallet /* Message */ } = models;
      User.hasOne(BasicProfile, {
        foreignKey: "user_id",
        constraints: false,
        onDelete: "cascade",
        // scope: {
        //   role: "basic",
        // },
        // as: "profile",
      });
      BasicProfile.belongsTo(User, {
        foreignKey: "user_id",
        constraints: false,
      });

      User.hasOne(AdminProfile, {
        foreignKey: "user_id",
        constraints: false,
      });

      AdminProfile.belongsTo(User, {
        foreignKey: "user_id",
        constraints: false,
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
    getProfile(options) {
      if (!this.role) return Promise.resolve(null);
      const mixinMethodName = `get${uppercaseFirst(this.role)}Profile`;
      return this[mixinMethodName](options);
    }
    // setProfile(options) {
    //   debugger;
    //   if (!this.role) return Promise.resolve(null);
    //   const mixinMethodName = `set${uppercaseFirst(this.role)}Profile`;
    //   return this[mixinMethodName](options);
    // }
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
      role: DataTypes.STRING,
      permission: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      archived_at: DataTypes.DATE,
      last_seen: DataTypes.DATE,
      login_at: DataTypes.DATE,

      online: {
        type: new DataTypes.VIRTUAL(DataTypes.BOOLEAN, ["createdAt"]),
        get: function() {
          return this.get("updateAt") > Date.now() - 7 * 24 * 60 * 60 * 1000;
        },
      },
      isAdmin: {
        type: new DataTypes.VIRTUAL(DataTypes.BOOLEAN, ["role"]),
        get: function() {
          return this.get("role")==roles.admin;
        },
      },
      isBasic: {
        type: new DataTypes.VIRTUAL(DataTypes.BOOLEAN, ["role"]),
        get: function() {
          return this.get("role")==roles.basic;
        },
      },
      
    },
    {
      sequelize,
      modelName: "User",
      underscored: true,
      tableName: "tbl_users",
      paranoid: true,
      deletedAt: "archived_at",
      hooks,
      scopes: {
        admin: {
          role: "admin",
        },
        basic: {
          role: "basic",
        },
      },
    }
  );

  User.addHook("afterFind", async (findResult) => {
    if (!Array.isArray(findResult)) findResult = [findResult];
    for (const instance of findResult) {
      if (instance?.role === "admin") {
        instance.profile = await instance.getAdminProfile();
      } else if (instance?.role === "basic") {
        instance.profile = await instance.getBasicProfile();
      }
      if (instance)
        instance.dataValues = {
          ...instance?.profile?.dataValues,
          ...instance?.dataValues,
        };
      // To prevent mistakes:
      //    delete instance?.basic;
      // delete instance?.dataValues.basic;
      // delete instance?.admin;
      // delete instance?.dataValues.admin;
    }
  });
  return User;
};
