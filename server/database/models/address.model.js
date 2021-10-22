"use strict";
const { Model } = require("sequelize");
const _ = require("underscore");

module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const { Address, Profile } = models;

      Address.hasOne(Profile, {
        foreignKey: "address_id",
        as: 'address'
      });
    }
    toPublic() {
      return _.omit(this.toJSON(), []);
    }
  }
  Address.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      country: {
        type: DataTypes.STRING,
      },
      address_line: {
        type: DataTypes.STRING,
      },
      region: {
        type: DataTypes.STRING,
      },
      profile_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Address",
      underscored: true,
      tableName: "tbl_address",
    }
  );

  return Address;
};
