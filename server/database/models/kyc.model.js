"use strict";
const { Model } = require("sequelize");
const _ = require("underscore");
const {
  types: { KycStatusType },
} = require("../../consts");

module.exports = (sequelize, DataTypes) => {
  class KYC extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const { Upload, Profile } = models;

      KYC.belongsTo(Upload, {
        foreignKey: "upload_id",
        allowNull: true,
        as: "upload",
      });

    
    }
    toPublic() {
      return _.omit(this.toJSON(), []);
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
      profile_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      archived_at: DataTypes.DATE,
      document_id: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "KYC",
      underscored: true,
      tableName: "tbl_kyc",
      paranoid: true,
      deletedAt: "archived_at",
    }
  );

  return KYC;
};
