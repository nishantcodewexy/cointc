"use strict";
const { Model } = require("sequelize");
const Tatum = require("@tatumio/tatum");
const walletServices = require("../../services/wallet")

const _ = require("underscore");

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
      tableName: "tbl_wallets",
      hooks: {
        /**
         * 
         * @param {Object} model 
         * @param {Object} options 
         */
        async beforeValidate(model, options) {
          
          model.asset = model.asset.toUpperCase();
          const {
            mnemonic,
            xpub,
            key,
            address,
            tatum_account_id
          } = await new WalletCreator().generate(model.asset,model.user_id);
          model.extended_pub = xpub;
          model.private_key = key;
          model.address = address;
          model.mnemonic = mnemonic;
          model.tatum_account_id = tatum_account_id;
        },
      },
    }
  );
  return Wallet;
};

class WalletCreator {
  constructor(index = 0) {
    this.newtworkType = process.env.NODE_ENV === "production";
    this.index = index;
  }

  /**
   * 
   * @typedef getMnemonicAndExPubReturn
   * @property {String} mnemonic
   * @property {String} xpub
   */

  
  /**
   * @name getMnemonicAndExPub
   * @description generate mnemonic and extended public key
   * @param {String} [mnemonic] string for generating wallet
   * @param {String} currency crypto asset to be created
   * @returns {Promise<Object>} {mnemonic, xpub}
   */
  async #getMnemonicAndExPub(currency, mnemonic) {
    const wallet = await Tatum.generateWallet(
      Tatum.Currency[currency.toUpperCase()],
      this.newtworkType, // network type
      mnemonic
    );
    return wallet;
  }

  /**
   * @name createPrivateKey
   * @description generate wallet private key
   * @param {String} currency crypto asset
   * @param {String} mnemonic
   * @returns {Promise<Object>}
   */
  async #createPrivateKey(currency, mnemonic) {
    const privateKey = await Tatum.generatePrivateKeyFromMnemonic(
      Tatum.Currency[currency.toUpperCase()],
      this.newtworkType, // network type
      mnemonic,
      this.index
    );

    return privateKey;
  }

  /**
   * @name createWalletAddress
   * @description create account wallet address
   * @param {String} currency crypto asset
   * @param {String} pubicKey wallet extended public key
   * @returns {Object}
   */
  #createWalletAddress(currency, pubicKey) {
    const address = Tatum.generateAddressFromXPub(
      Tatum.Currency[currency.toUpperCase()],
      this.newtworkType, // network type
      pubicKey,
      this.index
    );
    return address;
  }


  /**
   * 
   * @typedef generateReturn
   * @property {String} mnemonic
   * @property {String} xpub
   * @property {String} key
   * @property {String} address
   * @property {String} tatum_account_id
   */

  /**
   * 
   * @param {String} currency
   * @param {String} user_id
   * @returns {Promise<generateReturn>}
   */
  async generate(currency,user_id) {
    const { mnemonic, xpub } = await this.#getMnemonicAndExPub(currency);
    const key = await this.#createPrivateKey(currency, mnemonic);
    // const address = await this.#createWalletAddress(currency, xpub);
    const {id:tatum_account_id} = await walletServices.createAccount({currency,xpub,user_id})
    
    const {address} = await walletServices.createAddressFromWallet({wallet:{tatum_account_id}})
    return { mnemonic, xpub, key, address,tatum_account_id };
  }
}
