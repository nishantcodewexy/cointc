// const RippleAPI = require('ripple-lib').RippleAPI;
// const env = process.env.NODE_ENVIRONMENT || "development";

let provider = null;
// assert(provider, 'XRP:PROVIDER invalid');

// Wallet metadata
const metadata = {
  version: '1.0.0',
  name: 'ripple',
  symbol: 'XRP',
}

module.exports = initialize();


function initialize() {
  try{

    return {
      ...metadata,
      wallet: null,
      async connect(wallet){
        // this.wallet = await wallet.connect(provider);
        return this;
      },
    }
  }catch(err){
    console.trace('Ripple (XRP) wallet error', err)
    return err;
  }
}

function _check(cb){
  // Checks for provider before running any command
  assert(provider, `${metadata.symbol} Wallet is not connected to provider. Connect wallet using the connect method`);
  return cb();
}
