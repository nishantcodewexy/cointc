"use strict";
const { Model } = require("sequelize");
const _ = require("underscore");
const { tableNames } = require("../../consts");
const hooks = require('../hooks/wallet.hook');

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
        foreignKey: "owner_id",
      });
    }

    toPublic() {
      return _.pick(this, "extended_pub", "asset", "address");
    }
  }

  Wallet.init(
    {
      // owner_id: DataTypes.UUID,
      // wallet_keystore: DataTypes.JSON,
      // passphrase: DataTypes.STRING,
      mnemonic: DataTypes.STRING,
      mnemonic_index: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      extended_pub: DataTypes.STRING,
      private_key: DataTypes.STRING,
      address: DataTypes.STRING,
      asset: {
        type: DataTypes.ENUM("BTC", "ETH", "BNB", "XRP", "USDT"),
        allowNull: false,
        defaultValue: "BTC",
      },
      tatum_account_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Wallet",
      underscored: true,
      tableName: tableNames?.WALLET || "tbl_wallets",
      hooks
    }
  );
  return Wallet;
};
