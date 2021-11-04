"use strict";
const { Model } = require("sequelize");
const _ = require("underscore");
const hooks = require("../hooks/user.hook");
const { tableNames } = require("../../consts");
const faker = require("faker");
const Profile = require("./profile.model");
// const uppercaseFirst = (str) => `${str[0].toUpperCase()}${str.substr(1)}`;

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
        Kyc,
        Security,
        Secession,
        Upload,
        Currency,
        Advert,
        Order,
        Fee,
        Policy,
      } = models;

      User.hasOne(User, {
        foreignKey: {
          type: DataTypes.UUID,
          name: "created_by",
        },
      });

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
        as: "bankdetails",
        foreignKey: { name: "user_id", allowNull: false },
      });

      User.hasMany(Address, {
        as: "addresses",
        foreignKey: { name: "user_id", allowNull: false },
      });

      User.hasOne(Kyc, {
        as: "kyc",
        foreignKey: { name: "user_id", allowNull: false },
      });

      User.hasOne(Security, {
        as: "security",
        foreignKey: { name: "user_id", allowNull: false },
      });

      User.hasMany(Secession, {
        as: "secessions",
        foreignKey: { name: "user_id", allowNull: false },
      });

      User.hasMany(Upload, {
        as: "uploads",
        foreignKey: { name: "user_id", allowNull: false },
      });

      User.hasMany(Currency, {
        as: "currencies",
        foreignKey: { name: "user_id", allowNull: false },
      });

      User.hasMany(Advert, {
        as: "adverts",
        foreignKey: { name: "user_id", allowNull: false },
      });

      User.hasMany(Order, {
        as: "orders",
        foreignKey: {
          name: "user_id",
        },
      });
      User.hasMany(Fee, {
        as: "fees",
        foreignKey: {
          name: "user_id",
        },
      });
      User.hasMany(Policy, {
        as: "policies",
        foreignKey: {
          name: "user_id",
        },
      });
      // User.hasMany(Message, {})
    }
    toPublic() {
      return _.omit(this.toJSON(), ["password"]);
    }
    static FAKE(count = 0) {
      let rows = [],
        result = {},
        index = 0;
      let generateFakeData = () => {
        let id = faker.datatype.uuid(),
          access_level = faker.helpers.randomize([1, 2, 3]);
        return {
          id,
          user_id: id,
          email: faker.internet.email(),
          permission: faker.datatype.boolean(),
          archived_at: faker.datatype.datetime(),
          last_seen: faker.datatype.datetime(),
          login_at: faker.datatype.datetime(),
          access_level,
          online: faker.helpers.randomize([true, false]),
          isBasic: access_level === 1,
          isAdmin: access_level === 2,
          isSuperAdmin: access_level === 3,
          profile_id: faker.datatype.uuid(),
          mode: null,
          createdAt: faker.datatype.datetime(),
          updatedAt: faker.datatype.datetime(),
          ...Profile(sequelize, DataTypes).FAKE(),
        };
      };
      if (count > 0) {
        for (; index < count; ++index) {
          rows.push(generateFakeData());
        }
        result = { count, rows };
      } else result = { ...generateFakeData() };
      return result;
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
      // role: DataTypes.STRING,
      permission: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      archived_at: DataTypes.DATE,
      last_seen: DataTypes.DATE,
      login_at: DataTypes.DATE,
      verified: { type: DataTypes.BOOLEAN, defaultValue: false },
      active: { type: DataTypes.BOOLEAN, defaultValue: true },
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
      tableName: tableNames?.USER || "tbl_users",
      paranoid: true,
      deletedAt: "archived_at",
      hooks,
      /* scopes: {
       
      }, */
    }
  );

  return User;
};
