"use strict";

const Tatum = require("@tatumio/tatum");

class WalletCreator {
  constructor(index = 0) {
    this.networkType = process.env.NODE_ENV === "production";
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
      this.networkType, // network type
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
      this.networkType, // network type
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
      this.networkType, // network type
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
  async generate(currency, user_id) {
    const { mnemonic, xpub } = await this.#getMnemonicAndExPub(currency);
    const key = await this.#createPrivateKey(currency, mnemonic);
    // const address = await this.#createWalletAddress(currency, xpub);
    const { id: tatum_account_id } = await walletServices.createAccount({
      currency,
      xpub,
      user_id,
    });

    const { address } = await walletServices.createAddressFromWallet({
      wallet: { tatum_account_id },
    });
    return { mnemonic, xpub, key, address, tatum_account_id };
  }
}

module.exports = {
  /**
   * @function  beforeValidate
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
      tatum_account_id,
    } = await new WalletCreator().generate(model.asset, model.user_id);
    model.extended_pub = xpub;
    model.private_key = key;
    model.address = address;
    model.mnemonic = mnemonic;
    model.tatum_account_id = tatum_account_id;
  },
  // prioryty 1
  // beforeBulkCreate:async (instances,options)=>{

  // },
  // beforeBulkDestroy:async (options)=>{

  // },
  // beforeBulkUpdate:async (options)=>{

  // },

  // prioryty 4
  // beforeCreate:async (instance,options)=>{

  // },
  // beforeDestroy:async (instance,options)=>{

  // },
  // beforeUpdate:async (instance,options)=>{

  // },
  // beforeSave:async (instance,options)=>{

  // },
  // beforeUpsert:async (values,options)=>{

  // },

  // prioryty 5
  // afterCreate:async (instance,options)=>{

  // },
  // afterDestroy:async (instance,options)=>{

  // },
  // afterUpdate:async (instance,options)=>{

  // },
  // afterSave:async (instance,options)=>{

  // },
  // afterUpsert:async (created,options)=>{

  // },

  // priority 6

  // afterBulkCreate:async (instances,options)=>{

  // },
  // afterBulkDestroy:async (options)=>{

  // },
  // afterBulkUpdate:async (options)=>{

  // },
};
