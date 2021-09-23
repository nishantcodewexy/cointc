const env = process.env.NODE_ENVIRONMENT || "development";

// Get BNB provider
let provider = null;
// TODO: assert(provider, 'BNB:PROVIDER invalid');


// Wallet metadata
const metadata = {
  version: '1.0.0',
  name: 'Binance BNB',
  symbol: 'BNB',
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
    console.trace('Binance (BNB) wallet error', err)
    return err;
  }
}



function _check (cb) {
  // Checks for provider before running any command
  assert(provider, `${metadata.symbol} Wallet is not connected to provider. Connect wallet using the connect method`);
  return cb();
}
