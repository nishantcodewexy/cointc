"use strict";
const { Model } = require("sequelize");
const _ = require("underscore");
const hooks = require("../hooks/user.profile.hook");
const { tableNames } = require("../../consts");

module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const { Profile, KYC, Upload, User, Address } = models;

      Profile.belongsTo(User, {
        foreignKey: "user_id",
      });

      Profile.belongsTo(Upload, {
        foreignKey: "avatar_upload",
      });
    }
    toPublic() {
      return _.omit(this.toJSON(), []);
    }
  }

  UserProfile.init(
    {
      profile_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      user_id: {
        type: DataTypes.UUID,
      },
      mode: {
        type: DataTypes.ENUM,
        values: ["standard"],
        comment: "User mode state: [standard, merchant]",
      },
      invite_code: {
        type: DataTypes.STRING,
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
      suitability: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
          min: 0,
          max: 5,
        },
      },
      date_of_birth: DataTypes.DATE,
      phone: DataTypes.STRING,
      payment_methods: DataTypes.JSON,
      pname: { type: DataTypes.STRING, comment: "public name" },
      lname: { type: DataTypes.STRING, comment: "last name" },
      oname: {
        type: DataTypes.STRING,
        comment: "other names",
      },
      archived_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Profile",
      underscored: true,
      tableName: tableNames?.PROFILE || "tbl_user_profiles",
      paranoid: true,
      deletedAt: "archived_at",
      hooks,
    }
  );

  // UserProfile.addHook("afterFind", async (foundResult) => {
  //   if (!foundResult) return;

  //   // // let consolidated = {};
  //   // if (!Array.isArray(foundResult)) foundResult = [foundResult];
  //   // for (const instance of foundResult) {
  //   //   // Get address

  //   //   if (instance)
  //   //     instance.dataValues = {
  //   //       ...instance?.dataValues,
  //   //     };
  //   // }
  // });

  return UserProfile;
};
