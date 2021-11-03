"use strict";

const Tatum = require("@tatumio/tatum");

// class WalletCreator {
//   constructor(index = 0) {
//     this.newtworkType = process.env.NODE_ENV === "production";
//     this.index = index;
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
//   async #getMnemonicAndExPub(currency, mnemonic) {
//     const wallet = await Tatum.generateWallet(
//       Tatum.Currency[currency.toUpperCase()],
//       this.newtworkType, // network type
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
//   async #createPrivateKey(currency, mnemonic) {
//     const privateKey = await Tatum.generatePrivateKeyFromMnemonic(
//       Tatum.Currency[currency.toUpperCase()],
//       this.newtworkType, // network type
//       mnemonic,
//       this.index
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
//   #createWalletAddress(currency, pubicKey) {
//     const address = Tatum.generateAddressFromXPub(
//       Tatum.Currency[currency.toUpperCase()],
//       this.newtworkType, // network type
//       pubicKey,
//       this.index
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
//   async generate(currency, user_id) {
//     const { mnemonic, xpub } = await this.#getMnemonicAndExPub(currency);
//     const key = await this.#createPrivateKey(currency, mnemonic);
//     // const address = await this.#createWalletAddress(currency, xpub);
//     const { id: tatum_account_id } = await walletServices.createAccount({
//       currency,
//       xpub,
//       user_id,
//     });

//     const { address } = await walletServices.createAddressFromWallet({
//       wallet: { tatum_account_id },
//     });
//     return { mnemonic, xpub, key, address, tatum_account_id };
//   }
// }
const testnet = process.env.NODE_ENV === "development";

module.exports = {
  /**
   * @function  beforeValidate
   * @param {Object} instance
   * @param {Object} options
   */
  async beforeValidate(instance) {
    instance.currency = instance.currency.toUpperCase();

    let { mnemonics, xpub, address } = await Tatum?.generateWallet(
      instance.currency,
      testnet
    );
    xpub = (xpub || address) ?? mnemonics;
      
    let account = {
      currency: instance.currency,
      xpub,
      customer: {
        externalId: instance.user_id,
      },
    };
    // create user account and wallet
    let newAccount = await Tatum.generateAccount(account);

    // You can gett account back using the following
    /*  let acct = await Tatum.getAccountById(newAccount?.account?.id);
      console.log({acct}) */
    instance.account_id = newAccount?.account?.id;
    instance.derivation_key = newAccount?.address?.derivationKey;
    instance.address = newAccount?.address?.address;
    instance.frozen = newAccount?.account?.frozen;
  },

  async afterFind(findResult, options) {
    if (findResult && !Array.isArray(findResult)) findResult = [findResult];
    for (let instance of findResult) {
      let account_id = instance?.dataValues?.account_id;
      let customerId = instance?.dataValues?.user_id;
      let currency = instance?.dataValues?.currency;
      let derivationKey = instance?.dataValues?.derivation_key;
      let account = await Tatum.getAccountById(account_id);
      let user = await instance?.getUser();
      instance.dataValues = {
        ...instance.dataValues,
        ...account,
        user: user?.dataValues,
      };
    }
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
