"use strict";
const { Model } = require("sequelize");
const { objectToHex, encrypt, generateReferralCode } = require("../../helpers");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const { User, Referral } = models;
      User.belongsToMany(User, {
        through: Referral,
        as: "referrer",
        onDelete: "CASCADE",
      });
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
        set: async (value) => {
          this.setDataValue("password", await encrypt(value));
        },
      },
      fname: DataTypes.STRING,
      lname: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      phone_verified: DataTypes.BOOLEAN,
      id_verified: DataTypes.BOOLEAN,
      email_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      payment_methods: DataTypes.JSONB,
      role: {
        type: DataTypes.ENUM(["standard", "admin"]),
        defaultValue: "standard",
      },
      referral_code: {
        type: DataTypes.STRING,
      },
      referrerId: {
        type: DataTypes.INTEGER,
      },
      otp: {
        type: DataTypes.STRING,
      },
      otp_ttl: DataTypes.DATE,
      last_login: DataTypes.DATE,
      verify_token: DataTypes.STRING,
      verify_token_ttl: { type: DataTypes.DATE },
      profile: {
        type: DataTypes.VIRTUAL,
        get() {
          return {
            name: String().trim(`${this.fname} ${this.lname}`),
            role: this.role,
            phone: this.phone_number,
            ref_code: this.referral_code,
            last_login: this.last_login,
            payment_methods: this.payment_methods,
            email: this.email,
          };
        }
      }
    },
    {
      sequelize,
      modelName: "User",
      underscored: true,
      tableName: "tbl_users",
      timestamps: false,
      hooks: {
        beforeBulkCreate: (user, options) => {
          user.referral_code = generateReferralCode(user.email);
        },
      },
      
    }
  );

  return User;
};
