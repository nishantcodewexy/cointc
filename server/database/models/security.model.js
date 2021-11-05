"use strict";
const { Model } = require("sequelize");
const _ = require("underscore");
const { tableNames } = require("../../consts");
const faker = require("faker");
const hooks = require("../hooks/security.hook");
const User = require('./user.model');

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
        return {
          id: faker.datatype.uuid(),
          otp: faker.datatype.float(5),
          otp_ttl: faker.datatype.datetime(),
          two_factor: faker.datatype.boolean(),
          verify_token: faker.random.alphaNumeric(50),
          verify_token_ttl: faker.datatype.datetime(),
          user: User(sequelize, DataTypes).FAKE(),
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
      two_factor: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      verify_token: DataTypes.STRING,
      verify_token_ttl: { type: DataTypes.DATE },
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
