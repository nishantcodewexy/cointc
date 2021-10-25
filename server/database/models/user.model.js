"use strict";
const { Model } = require("sequelize");
const _ = require("underscore");
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
      const {
        Profile,
        User,
        BankDetail,
        Wallet,
        Address,
        KYC,
        Security,
        Secession,
        Upload,
        Currency,
        Advert,
      } = models;

      User.hasMany(Wallet, {
        foreignKey: { name: "user_id", allowNull: false },
      });

      User.hasOne(Profile, {
        foreignKey: {
          name: "user_id",
          allowNull: false,
        },
      });

      User.hasMany(BankDetail, {
        foreignKey: { name: "user_id", as: "bankdetails", allowNull: false },
      });

      User.hasMany(Address, {
        foreignKey: { name: "user_id", as: "addresses", allowNull: false },
      });

      User.hasOne(KYC, {
        foreignKey: { name: "user_id", as: "kyc", allowNull: false },
      });

      User.hasOne(Security, {
        foreignKey: { name: "user_id", as: "security", allowNull: false },
      });

      User.hasMany(Secession, {
        foreignKey: { name: "user_id", as: "secessions", allowNull: false },
      });

      User.hasMany(Upload, {
        foreignKey: { name: "user_id", as: "uploads", allowNull: false },
      });

      User.hasMany(Currency, {
        foreignKey: { name: "user_id", as: "currencies", allowNull: false },
      });

      User.hasMany(Advert, {
        foreignKey: { name: "user_id", as: "adverts", allowNull: false },
      });

      // User.hasMany(Message, {})
    }
    toPublic() {
      return _.omit(this.toJSON(), ["password"]);
    }

    // getProfile(options) {
    //   if (!this.role) return Promise.resolve(null);
    //   const mixinMethodName = `get${uppercaseFirst(this.role)}Profile`;
    //   return this[mixinMethodName](options);
    // }
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
      access_level: {
        type: DataTypes.INTEGER,
        validate: {
          min: 0,
          isInt: true,
          max: 3,
        },
        defaultValue: 1,
      },

      // VIRTUALS
      online: {
        type: new DataTypes.VIRTUAL(DataTypes.BOOLEAN, ["createdAt"]),
        get: function() {
          return this.get("updateAt") > Date.now() - 7 * 24 * 60 * 60 * 1000;
        },
      },

      isBasic: {
        type: new DataTypes.VIRTUAL(DataTypes.BOOLEAN, ["access_level"]),
        get() {
          return this.get("access_level") === 1;
        },
      },

      isAdmin: {
        type: new DataTypes.VIRTUAL(DataTypes.BOOLEAN, ["access_level"]),
        get() {
          return this.get("access_level") === 2;
        },
      },

      isSuperAdmin: {
        type: new DataTypes.VIRTUAL(DataTypes.BOOLEAN, ["access_level"]),
        get() {
          return this.get("access_level") === 3;
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
    if (!findResult) return;

    if (!Array.isArray(findResult)) findResult = [findResult];
    for (const instance of findResult) {
      instance.profile = await instance.getProfile();
      /*  if (instance?.role === "admin") {
        instance.profile = await instance.getAdminProfile();
      } else if (instance?.role === "basic") {
        instance.profile = await instance.getBasicProfile();
      } */
      if (instance)
        instance.dataValues = {
          ...instance?.profile?.dataValues,
          ...instance?.dataValues,
        };
    }
  });
  return User;
};