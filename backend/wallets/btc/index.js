"use strict"
const env = process.env.NODE_ENVIRONMENT || "development";
const Client = require('bitcoin-core');
let provider = null;
let error = null;

const {GETBLOCK_API_KEY} = process.env;
let networkTypes = {
  development: 'testnet',
  production: 'mainnet'
};

const network = GETBLOCK_API_KEY ? ` https://btc.getblock.io/${networkTypes[env]}/?api_key=${GETBLOCK_API_KEY}` : 'http://localhost:8545';

console.log(network, GETBLOCK_API_KEY)
// Get BTC provider
// provider = new Client({ network });

// Wallet metadata
const metadata = {
  version: '1.0.0',
  name: 'Bitcoin',
  symbol: 'BTC',
};

module.exports = initialize();

function initialize() {
  try{
    return {
      ...metadata,
      wallet: null,
      async connect(wallet){
        // TODO: Use wallet connector to connect wallet to provider
        // this.wallet = await wallet.connect(provider);
        return this;
      },
    }
  }catch(err){
    console.trace('Bitcoin (BTC) wallet error', err)
    return err;
  }
}


function _check (cb) {
  // Checks for provider before running any command
  assert(provider, `${metadata.symbol} Wallet is not connected to provider. Connect wallet using the connect method`);
  return cb();
}
