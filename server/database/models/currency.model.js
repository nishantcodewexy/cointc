"use strict";
const { Model } = require("sequelize");
const _ = require("underscore");
const { tableNames } = require("../../consts");
const faker = require("faker");

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

    static FAKE(count) {
      let rows = [],
        result = {},
        index = 0;
      let generateFakeData = () => {
        let id = faker.datatype.uuid();

        return {
          id,
          name: faker.lorem.sentence(),
          iso_code: faker.finance.bic(),
          type: faker.helpers.randomize(["fiat", "crypto"]),
          image_url: faker.image.imageUrl(),
          archived_at: faker.datatype.datetime(),
          createdAt: faker.datatype.datetime(),
          updatedAt: faker.datatype.datetime(),
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
        comment: "Currency code",
        unique: true,
        set(value) {
          this.setDataValue("iso_code", String(value)?.toUpperCase());
        },
      },
      type: {
        type: DataTypes.ENUM("FIAT", "CRYPTO"),
        comment: "Currency type",
        get() {
          return String(this.getDataValue("type"))?.toUpperCase();
        },
        set(value) {
          this.setDataValue("type", String(value)?.toUpperCase());
        },
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
