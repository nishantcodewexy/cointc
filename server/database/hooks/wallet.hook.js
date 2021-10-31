"use strict";

const Tatum = require("@tatumio/tatum");

// class TatumAccount {
//   constructor({user_id, currency}) {
//     this.testnet = process.env.NODE_ENV === "development";
//     this.currency = currency?.toUpperCase();
//     this.user_id = user_id;

//     return this
//   }

//   generateWallet() {
//     return Tatum?.generateWallet(currency, this.testnet);
//   }

//   createAccount() {
//     return await Tatum?.createAccount({
//       currency,
//       xpub,
//       customer: {
//         externalId: this.user_id
//       }
//     });
//   }
//   /**
//    *
//    * @typedef getMnemonicAndExPubReturn
//    * @property {String} mnemonic
//    * @property {String} xpub
//    */

//   /**
//    * @name getMnemonicAndExPub
//    * @description generate mnemonic and extended public key
//    * @param {String} [mnemonic] string for generating wallet
//    * @param {String} currency crypto asset to be created
//    * @returns {Promise<Object>} {mnemonic, xpub}
//    */
//   async #getMnemonicAndExPub() {
//     const wallet = await Tatum.generateWallet(
//       Tatum.Currency[currency.toUpperCase()],
//       this.testnet, // network type
//       mnemonic
//     );
//     return wallet;
//   }

//   /**
//    * @name createPrivateKey
//    * @description generate wallet private key
//    * @param {String} currency crypto asset
//    * @param {String} mnemonic
//    * @returns {Promise<Object>}
//    */
//   async #createPrivateKey(mnemonic) {
//     const privateKey = await Tatum.generatePrivateKeyFromMnemonic(
//       Tatum.Currency[currency.toUpperCase()],
//       this.testnet, // network type
//       mnemonic,
//       this.user_id
//     );

//     return privateKey;
//   }

//   /**
//    * @name createWalletAddress
//    * @description create account wallet address
//    * @param {String} currency crypto asset
//    * @param {String} pubicKey wallet extended public key
//    * @returns {Object}
//    */
//   #createWalletAddress(pubicKey) {
//     const address = Tatum.generateAddressFromXPub(
//       Tatum.Currency[currency.toUpperCase()],
//       this.testnet, // network type
//       pubicKey,
//       this.user_id
//     );
//     return address;
//   }

//   /**
//    *
//    * @typedef generateReturn
//    * @property {String} mnemonic
//    * @property {String} xpub
//    * @property {String} key
//    * @property {String} address
//    * @property {String} tatum_account_id
//    */

//   /**
//    *
//    * @param {String} currency
//    * @param {String} user_id
//    * @returns {Promise<generateReturn>}
//    */
//   // generateWallet(currency: Currency, testnet: boolean, mnemonic?: string)
//   async generate(mnemonic) {
//     /* const { mnemonic, xpub } = await this.#getMnemonicAndExPub();
//     const key = await this.#createPrivateKey(this?.currency, mnemonic);
//     // const address = await this.#createWalletAddress(currency, xpub);
//     const { id: tatum_account_id } = await Tatum.createAccount(currency, this.testnet);

//     const { address } = Tatum.generateWallet({
//       wallet: { tatum_account_id },
//     });
//     return { mnemonic, xpub, key, address, tatum_account_id }; */
//     return await Tatum.generateWallet(this.currency, this.testnet, mnemonic);
//   }
// }

module.exports = {
  /**
   * @function  beforeValidate
   * @param {Object} model
   * @param {Object} options
   */
  async beforeValidate(model) {
    model.currency = model.currency.toUpperCase();
    let testnet = process.env.NODE_ENV === "development";

    // let { mnemonic, xpub, privateKey,address, secret } = Tatum?.generateWallet(
    //   model.currency,
    //   testnet
    // );

    let account = {
      currency: model.currency,
      customer: {
        externalId: model.user_id,
      },
    };
    // create user account
    Tatum.createAccount(account).then(({ id, currency, xpub }) => {
      let address = Tatum.generateAddressFromXPub(currency, testnet, xpub, 1);
      model.xpub = xpub;
      model.key = key;
      model.address = address;
      model.mnemonic = mnemonic;
      model.tatum_account_id = id;
    });
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
