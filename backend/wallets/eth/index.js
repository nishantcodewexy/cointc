"use strict"
const { ethers } = require("ethers");
const assert = require('assert');
const env = process.env.NODE_ENVIRONMENT || "development";
// const { TextDecoder, TextEncoder } = require('util');

const {GETBLOCK_API_KEY, INFURA_PRODUCT_ID, ETHERSCAN_API_KEY} = process.env;

let networkTypes = {
  development: 'testnet',
  production: 'mainnet'
}
let error = null;
const network = GETBLOCK_API_KEY ? `https://eth.getblock.io/${networkTypes[env]}/?api_key=${GETBLOCK_API_KEY}` : 'http://localhost:8545';

let provider = ethers.getDefaultProvider(network,
  {
    etherscan: ETHERSCAN_API_KEY,
    infura: INFURA_PRODUCT_ID,
  }
);

provider._networkPromise.catch(err => error = new Error(err));

module.exports = initialize();

function initialize(){
  try{
    assert.strict.ifError(error);

    function _check (cb) {
      // Checks for provider before running any command
      assert(provider, 'ETH:Wallet is not connected to provider. Connect wallet using the connect method');
      return cb();
    }

    return {
      version: '1.0.0',
      name: 'ether',
      symbol: 'ETH',
      utils: ethers.utils,
      wallet: null,

      async create(){
        const wallet  = new ethers.Wallet.createRandom();
        return this.connect(wallet)
      },

      async connect(wallet){
        this.wallet = await wallet.connect(provider);
        return this;
      },
      /**
      * @returns Promise -> string
      */
      async encrypt(wallet, password) {
        return _check(()=>{
          return wallet.encrypt(password)
        }).bind(this)
      },

      async getGasPrice(wallet){
        return _check(async ()=>await wallet.getGasPrice()).bind(this)
      },

      async getBalance(wallet, blkTag ='latest') {
        return _check(async ()=> await wallet.getBalance(blkTag).then(b=>b)).bind(this);
      },

      async getTransactions (){
        return _check(async ()=>await wallet.getTransactionCount()).bind(this)
      },

      async getBlock() {

      },

      async transferTo(){

      },
    }
  }catch(err){
    console.trace('Ethereum wallet error', err)
    return err;
  }
}
