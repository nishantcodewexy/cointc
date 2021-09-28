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

// Wallet metadata
const metadata = {
  version: '1.0.0',
  name: 'ether',
  symbol: 'ETH',
};

module.exports = initialize();

function initialize(){
  try{
    assert.strict.ifError(error);


    return {
      ...metadata,
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

      async getBalance(wallet, blockTag ='latest') {
        return _check(async ()=> await wallet.getBalance(blockTag).then(b=>b)).bind(this);
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
    console.trace('Ethereum (ETH) wallet error', err)
    return err;
  }
}

function _check (cb) {
  // Checks for provider before running any command
  assert(provider, `${metadata.symbol} Wallet is not connected to provider. Connect wallet using the connect method`);
  return cb();
}
