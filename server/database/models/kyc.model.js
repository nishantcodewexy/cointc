"use strict";
const { Model } = require("sequelize");
const _ = require("underscore");
const { tableNames, KycStatusType } = require("../../consts");
const faker = require('faker')
module.exports = (sequelize, DataTypes) => {
  class KYC extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const { Upload, User, Kyc} = models;

      Kyc.belongsTo(Upload, {
        foreignKey: "document_id",
        as: "upload",
      });

      Kyc.belongsTo(User, {
        foreignKey: "user_id",
      });
    }
    toPublic() {
      return _.omit(this.toJSON(), []);
    }
    static FAKE(count = 0) {
      let rows = [],
        result = {},
        index = 0;
      let generateFakeData = () => {
        let user_id = faker.datatype.uuid();
        return {
          id: faker.datatype.uuid(),
          document_id: faker.datatype.uuid(),
          user_id,
          archived_at: faker.datatype.datetime(),
          status: faker.helpers.randomize(["PENDING", "ACCEPT", "DENY"]),
          type: faker.helpers.randomize(["email", "id", "sms"]),
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

  KYC.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      type: DataTypes.ENUM("email", "id", "sms"),
      status: {
        type: DataTypes.ENUM(Object.keys(KycStatusType)),
        allowNull: false,
        defaultValue: KycStatusType.PENDING,
      },
      user_id: {
        type: DataTypes.UUID,
      },
      archived_at: DataTypes.DATE,
      document_id: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Kyc",
      underscored: true,
      tableName: tableNames?.KYC || "tbl_kyc",
      paranoid: true,
      deletedAt: "archived_at",
    }
  );

  return KYC;
};
