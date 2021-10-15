"use strict";
const { Model } = require("sequelize");
const _ = require("underscore");
module.exports = (sequelize, DataTypes) => {
  class AdminProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const { AdminProfile, User } = models;
      
      User.AdminProfile = AdminProfile.belongsTo(User, {
        foreignKey: "user_id",
        allowNull: false,
        as: 'user'
      });
    }
    toPublic() {
      return _.omit(this.toJSON(), []);
    }
  }
  AdminProfile.init(
    {
      profile_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      kyc: {
        type: DataTypes.JSON,
        defaultValue: {
          account_no: "",
          bank_name: "",
          IFSC_code: "",
          country: "",
          currency: "",
          created_at: "",
        },
      },
      nickname: DataTypes.STRING,
      
      archived_at: DataTypes.DATE,

      /* profile: {
        type: DataTypes.VIRTUAL,
        get() {
          return {
            // id: this.id,
            // nickname: this.nickname,
            // phone: this.phone_number,
            // ref_code: this.referral_code,
            // last_login: this.last_login,
            // kyc: this.kyc,
          };
        },
      }, */
    },
    {
      sequelize,
      modelName: "AdminProfile",
      underscored: true,
      tableName: "tbl_admin_users_profile",
      paranoid: true,
      deletedAt: "archived_at",
    }
  );

  return AdminProfile;
};
