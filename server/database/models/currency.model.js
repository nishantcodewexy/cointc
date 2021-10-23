"use strict";
const { Model } = require("sequelize");
const _ = require("underscore");

module.exports = (sequelize, DataTypes) => {
  class Currency extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const { User, Currency } = models;

      Currency.belongsTo(User);
    }

    toPublic() {
      return _.omit(this.toJSON(), ["user_id"]);
    }
  }
  Currency.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      
      name: {
        type: DataTypes.STRING,
        unique: true,
      },
      iso_code: {
        type: DataTypes.STRING,
        unique: true,
      },
      type: {
        type: DataTypes.ENUM("fiat", "crypto"),
        defaultValue: "crypto",
      },
      archived_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Currency",
      underscored: true,
      tableName: "tbl_currencies",
      paranoid: true,
      deletedAt: "archived_at",
      /* indexes: [
        {
          name: "currency_idx",
          unique: true,
          fields: ["iso_code"],
        },
      ], */
    }
  );
  return Currency;
};
