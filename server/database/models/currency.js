"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Currency extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Currency.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: DataTypes.STRING,
      long_name: DataTypes.STRING,
      short_name: DataTypes.STRING,
      type: {
        type: DataTypes.ENUM("fiat", "crypto"),
        defaultValue: "crypto"
      },      
      archived_at: DataTypes.DATE,      
    },
    {
      sequelize,
      modelName: "Currecny",
      underscored: true,
      tableName: "tbl_currencies",
    }
  );
  return Currency;
};
