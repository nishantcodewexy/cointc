"use strict";
const { Model } = require("sequelize");
const _ = require("underscore");
const { tableNames } = require("../../consts");
const faker = require('faker');

module.exports = (sequelize, DataTypes) => {
  class Currency extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const { User, Currency, Upload } = models;
      Currency.belongsTo(User);
      Currency.belongsTo(Upload, {
        foreignKey: {
          name: "image_url",
        },
      });
    }

    toPublic() {
      return _.omit(this.toJSON(), ["user_id"]);
    }

    static FAKE(count = 0) {
      let rows = [],
        result = {},
        index = 0;
      let generateFakeData = () => {
        let user_id = faker.datatype.uuid();
        return {
          id: faker.datatype.uuid(),
          name: faker.finance.currencyName,
          iso_code: faker.finance.currencyCode,
          type: faker.helpers.randomize(["fiat", "crypto"]),
          image_url: faker.image.image(),
          archived_at: faker.datatype.datetime(),
          createdAt: faker.datatype.datetime(),
          updatedAt: faker.datatype.datetime(),
        };
      };
      if (count > 0) {
        for (; index < count; ++index) {
          rows.push(generateFakeData());
        }
        result = { count, rows };
      } else result = { ...generateFakeData() };
      return result;
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
      image_url: {
        type: DataTypes.UUID,
      },
      archived_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Currency",
      underscored: true,
      tableName: tableNames?.CURRENCY || "tbl_currencies",
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
