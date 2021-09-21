"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Wallet extends Model {
    /**
    * Helper method for defining associations.
    * This method is not a part of Sequelize lifecycle.
    * The `models/index` file will call this method automatically.
    */
    static associate(models) {
      const { User } = models;
      // User
      User.hasMany(Wallet, {
        foreignKey:{ name: "owner_id", allowNull: false },
      });
    }
  }
  Wallet.init(
    {
      owner_id: DataTypes.UUID,
      wallet_keystore: DataTypes.STRING,
      passphrase: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Wallet",
      underscored: true,
      tableName: "tbl_wallets",
    }
  );
  return Wallet;
};
