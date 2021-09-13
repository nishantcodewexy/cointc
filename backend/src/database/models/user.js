"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        set(value) {
          bcrypt.hashSync(value, 32, (hash) => {
            this.setDataValue("password", hash);
          });
        },
      },
      fname: DataTypes.STRING,
      lname: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      phone_verified: DataTypes.BOOLEAN,
      email_verified: DataTypes.BOOLEAN,
      payment_method: DataTypes.STRING,
      role: DataTypes.TEXT,
      // TODO: associate
      referrer: DataTypes.UUID,
      referral_code: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "User",
      underscored: true,
    }
  );
  return User;
};
