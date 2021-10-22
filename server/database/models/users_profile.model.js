"use strict";
const { Model } = require("sequelize");
const _ = require("underscore");
const hooks = require("../hooks/user.profile.hook");

module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const { Profile, KYC, Upload, User } = models;

      Profile.belongsTo(User, {
        foreignKey: "user_id",
      });

      Profile.belongsTo(Upload, {
        foreignKey: "profile_pic",
      });

      Profile.hasOne(KYC, {
        foreignKey: "profile_id",
      });
      // Profile.belongsTo(KYC, {
      //   foreignKey: "kyc_id",
      //   allowNull: false,
      // });
    }
    toPublic() {
      return _.omit(this.toJSON(), []);
    }
  }

  Profile.init(
    {
      profile_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      mode: {
        type: DataTypes.ENUM,
        values: ["standard"],
      },
      referral_code: {
        type: DataTypes.STRING,
      },
      nickname: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          isEmail: true,
        },
      },
      suitability: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      payment_methods: DataTypes.JSON,
      lname: DataTypes.STRING,
      oname: DataTypes.STRING,
      archived_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Profile",
      underscored: true,
      tableName: "tbl_users_profile",
      paranoid: true,
      deletedAt: "archived_at",
      hooks,
    }
  );

  return Profile;
};
