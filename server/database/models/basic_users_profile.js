"use strict";
const { Model } = require("sequelize");
const _ = require("underscore");
const hooks = require("../hooks/user.profile.hook");

const {
  types: { KycStatusType },
} = require("../../consts");

module.exports = (sequelize, DataTypes) => {
  class BasicProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const { BasicProfile, User, Upload } = models;
      BasicProfile.belongsTo(User, {
        foreignKey: "user_id",
      });
      BasicProfile.belongsTo(Upload, {
        foreignKey: "profile_pic",
      });
      BasicProfile.belongsTo(Upload, {
        foreignKey: "kyc_document",
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
  BasicProfile.init(
    {
      profile_id: {
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
      verify_token: DataTypes.STRING,
      verify_token_ttl: { type: DataTypes.DATE },
      archived_at: DataTypes.DATE,
      suitability: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      country: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      kyc_status: {
        type: DataTypes.ENUM(Object.keys(KycStatusType)),
        defaultValue: KycStatusType.PENDING,
      },
      last_name: {
        type: DataTypes.STRING,
      },
      other_names: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "BasicProfile",
      underscored: true,
      tableName: "tbl_basic_users_profile",
      timestamps: true,
      paranoid: true,
      deletedAt: "archived_at",
      hooks,
    }
  );

  return BasicProfile;
};
