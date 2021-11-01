"use strict";
const { Model } = require("sequelize");
const _ = require("underscore");
const { tableNames } = require("../../consts");
const hooks = require("../hooks/wallet.hook");

module.exports = (sequelize, DataTypes) => {
  class Wallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const { User, Wallet } = models;
      // User
      Wallet.belongsTo(User, {
        foreignKey: "user_id",
      });
    }

    toPublic() {
      return _.pick(this, "extended_pub", "asset", "address");
    }
  }

  Wallet.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      account_id: DataTypes.STRING,
      derivation_key: DataTypes.INTEGER,
      address: DataTypes.STRING,
      currency: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      frozen: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      sequelize,
      modelName: "Wallet",
      underscored: true,
      tableName: tableNames?.WALLET || "tbl_wallets",
      hooks,
    }
  );
  return Wallet;
};
