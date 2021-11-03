"use strict";
const { Model } = require("sequelize");
const del = require("del");
const { mimeTypes, FILE_UPLOAD_PATH, tableNames } = require("../../consts");
const faker = require("faker");

module.exports = (sequelize, DataTypes) => {
  class Upload extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    /**
     * del package ref
     * https://www.npmjs.com/package/del
     */

    /**
     *
     * @param {String} mediafolder
     */
    static cleanMediaFolder(mediafolder) {
      del.sync([
        `${mediafolder || FILE_UPLOAD_PATH}/**`,
        `!${mediafolder || FILE_UPLOAD_PATH}`,
      ]);
    }

    /**
     *
     * @param {Sting} filepath
     */
    static deleteFile(filepath) {
      if (filepath) {
        del.sync(!Array.isArray(filepath) ? [filepath] : filepath);
      }
    }
    static associate(models) {
      // define association here
      const { User, Upload } = models;

      Upload.belongsTo(User);
    }
    static FAKE(count = 0) {
      let rows = [],
        result = {},
        index = 0;
      let generateFakeData = () => {
        let user_id = faker.datatype.uuid();
        return {
          id: faker.datatype.uuid(),
          user_id,
          mimetype: faker.random.image(),
          original: faker.datatype.json(),
          thumbnail: faker.random.image(),
          description: faker.random.words,
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

  Upload.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      mimetype: {
        type: DataTypes.ENUM(Object.keys(mimeTypes)),
        allowNull: false,
      },
      original: {
        type: DataTypes.JSON,
        defaultValue: {},
      },
      thumbnail: {
        type: DataTypes.JSON,
        defaultValue: {},
      },
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Upload",
      tableName: tableNames?.UPLOAD || "tbl_uploads",
      underscored: true,
      paranoid: true,
      deletedAt: "deleted_at",
    }
  );

  return Upload;
};
