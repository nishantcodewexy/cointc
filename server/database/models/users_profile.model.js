"use strict";
const { Model } = require("sequelize");
const _ = require("underscore");
const hooks = require("../hooks/user.profile.hook");

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

      Profile.belongsTo(KYC, {
        foreignKey: "kyc_id",
      });

      Profile.belongsTo(Upload, {
        foreignKey: "profile_pic",
      });

      Profile.belongsTo(Address, {
        foreignKey: "address_id",
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
      },
      payment_methods: DataTypes.JSON,
      pname: { type: DataTypes.STRING, comment: "public name" },
      lname: { type: DataTypes.STRING, comment: "last name", allowNull: false },
      oname: {
        type: DataTypes.STRING,
        comment: "other names",
        allowNull: false,
      },
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

  UserProfile.addHook("afterFind", async (foundResult) => {
    if (!foundResult) return;

    // let consolidated = {};
    if (!Array.isArray(foundResult)) foundResult = [foundResult];
    for (const instance of foundResult) {
      // Get address
      instance.address = await instance.getAddress();
      instance.kyc = await instance.getKYC();

      if (instance)
        instance.dataValues = {
          kyc: instance.kyc?.dataValues,
          address: instance?.address?.dataValues,
          ...instance?.dataValues,
        };
    }
  });

  return UserProfile;
};
