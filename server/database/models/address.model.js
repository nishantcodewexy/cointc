"use strict";
const { Model } = require("sequelize");
const _ = require("underscore");
const { countries, tableNames } = require("../../consts");

module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const { Address, User } = models;

      Address.belongsTo(User, {
        foreignKey: "user_id",
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
        type: DataTypes.ENUM(Object.keys(countries)),
      },
      address_line: {
        type: DataTypes.STRING,
      },     
    },
    {
      sequelize,
      modelName: "Address",
      underscored: true,
      tableName: tableNames?.ADDRESS || "tbl_addresses",
    }
  );

  return Address;
};
