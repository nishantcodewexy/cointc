"use strict";
const { Model } = require("sequelize");
const { encrypt, generateReferralCode } = require("../../helpers");

module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const { Profile, User } = models;
      Profile.belongsTo(User);
    }
  }
  Profile.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
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

      profile: {
        type: DataTypes.VIRTUAL,
        get() {
          return {
            id: this.id,
            nickname: this.nickname,
            phone: this.phone_number,
            ref_code: this.referral_code,
            last_login: this.last_login,
            kyc: this.kyc,
          };
        },
      },
    },
    {
      sequelize,
      modelName: "Profile",
      underscored: true,
      tableName: "tbl_users_profile",
      timestamps: false,
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
