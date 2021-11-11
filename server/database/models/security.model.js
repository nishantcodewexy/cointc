"use strict";
const { Model } = require("sequelize");
const _ = require("underscore");
const { tableNames } = require("../../consts");
const faker = require("faker");
const hooks = require("../hooks/security.hook");

const CONFIRMATION_TYPES = {
  email: "EMAIL",
  sms: "SMS",
  otp: "OTP",
};

module.exports = (sequelize, DataTypes) => {
  class Security extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const { User, Security } = models;

      Security.belongsTo(User, {
        foreignKey: "user_id",
      });
    }

    static FAKE(count) {
      let rows = [],
        result = {},
        index = 0;
      let generateFakeData = () => {
        const { User } = sequelize?.models;
        return {
          id: faker.datatype.uuid(),
          otp: faker.datatype.float(5),
          otp_ttl: faker.datatype.datetime(),
          two_factor: faker.datatype.boolean(),
          last_verified_token: faker.random.alphaNumeric(50),
          user: User.FAKE(),
          login_confirmation: faker.helpers.randomize(
            Object.values(CONFIRMATION_TYPES)
          ),
          transaction_confirmation: faker.helpers.randomize(
            Object.values(CONFIRMATION_TYPES)
          ),
          ip_address: [faker.internet.ip()],
          createdAt: faker.datatype.datetime(),
          updatedAt: faker.datatype.datetime(),
        };
      };
      if (count > 1) {
        for (; index < count; ++index) {
          rows.push(generateFakeData());
        }
        result = { count, rows };
      } else result = { ...generateFakeData() };
      return result;
    }
  }

  Security.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      otp: {
        type: DataTypes.STRING,
      },
      otp_ttl: DataTypes.DATE,
      login_confirmation: {
        type: DataTypes.ENUM(Object.values(CONFIRMATION_TYPES)),
      },
      transaction_confirmation: {
        type: DataTypes.ENUM(Object.values(CONFIRMATION_TYPES)),
      },
      ip_address: {
        type: DataTypes.JSON,
        defaultValue: "[]",
        get: function() {
          return JSON.parse(this.getDataValue("ip_address"));
        },
        set: function(value) {
          this.setDataValue("ip_address", JSON.stringify(value));
        },
      },
      two_factor: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      last_verified_token: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Security",
      underscored: true,
      hooks,
      tableName: tableNames?.SECURITY || "tbl_user_securities",
    }
  );

  return Security;
};
