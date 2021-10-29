"use strict";
const { Model } = require("sequelize");
const _ = require("underscore");
const { tableNames } = require("../../consts");

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
      tableName: tableNames?.SECURITY || "tbl_user_securities",
    }
  );

  return Security;
};
