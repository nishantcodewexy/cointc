"use strict";
const { Model } = require("sequelize");
const _ = require("underscore");
const { generateReferralCode } = require("../../helpers");

module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const { Profile, User } = models;
      Profile.belongsTo(User, {
        foreignKey: "user_id",
      });
    }
    toPublic() {
      return _.omit(this.toJSON(), [
        "otp",
        "otp_ttl",
        "verify_token",
        "verify_token_ttl",
      ]);
    }
  }
  Profile.init(
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
      mode: {
        type: DataTypes.ENUM,
        values: ["standard"],
      },
      nickname: DataTypes.STRING,
      kyc: {
        defaultValue: {
          email: null,
          phone: null,
          id: null,
          payment_methods: null,
        },
        type: DataTypes.JSON,
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
      archived_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Profile",
      underscored: true,
      tableName: "tbl_users_profile",
      timestamps: true,
      paranoid: true,
      deletedAt: "archived_at",
      hooks: {
        beforeCreate: (profile, options) => {
          profile.referral_code = generateReferralCode(profile.email);
        },
      },
    }
  );

  return Profile;
};
