"use strict";
const { Model } = require("sequelize");
const { tableNames } = require("../../consts");
const faker = require("faker");

module.exports = (sequelize, DataTypes) => {
  class Referral extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const { User, Referral } = models;

      // User.belongsToMany(User, {
      //   through: Referral,
      //   as: "user_id",
      //   // constraint: false,
      //   onDelete: "CASCADE",
      // });

      // invitee
      User.belongsToMany(User, {
        as: "user_referral",
        through: Referral,
        foreignKey: "invited_id",
        otherKey: "user_id",
      });

      // Referral.belongsTo(User, {
      //   through: Referral,
      //   foreignKey: "referred_id",
      //   onDelete: "CASCADE",
      // });
      Referral.belongsTo(User);

      // Referral.belongsTo(User, {
      //   foreignKey: "user_id",
      // });
    }

    static FAKE(count){
      let rows = [],
        result = {},
        index = 0;
      let generateFakeData = () => {
        
        
          
        return {
          id: faker.datatype.uuid(),
          commission_in_percent: faker.datatype.float(),
          
        };
      };
      if (count > 1) {
        for (; index < count; ++index) {
          rows.push(generateFakeData());
        }
        result = { count, rows };
      } else result = { ...generateFakeData() };
      return result;
    }
  }
  Referral.init(
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      commission_in_percent: {
        type: DataTypes.DOUBLE,
        validate: {
          min: 0,
          max: 100,
        },
        defaultValue: process.env.REFERRAL_COMISSION || 20,
      },
    },
    {
      sequelize,
      modelName: "Referral",
      underscored: true,
      tableName: tableNames?.REFERRAL || "tbl_referrals",
      timestamps: false,
    }
  );
  return Referral;
};
