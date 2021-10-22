"use strict";
const { Model } = require("sequelize");
const _ = require("underscore");

module.exports = (sequelize, DataTypes) => {
  class OTP extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const { User, OTP } = models;

      OTP.belongsTo(User, {
        foreignKey: "user_id",
      });
    }
  }

  OTP.init(
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
      verify_token: DataTypes.STRING,
      verify_token_ttl: { type: DataTypes.DATE },
    },
    {
      sequelize,
      modelName: "OTP",
      underscored: true,
      tableName: "tbl_otp"
    }
  );

  return OTP;
};
