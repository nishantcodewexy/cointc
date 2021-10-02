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
      const { User, Wallet } = models;
      // User
      Wallet.belongsTo(User, {
        foreignKey: { name: "owner_id" },
      });
    }

    // generate mnemonic and ex_pub
    /**
     * @name getMnemonicAndExPub
     * @description generate mnemonic and extended public key
     * @param {String} mnemonic
     * @returns {Object} {mnemonic, xpub}
     */
    async getMnemonicAndExPub(mnemonic) {
      return;
    }
    //
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
        type: DataTypes.STRING,
        allowNull: false,
      },
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
