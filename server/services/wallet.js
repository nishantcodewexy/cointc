const tatum = require("@tatumio/tatum")

/**
 * 
 * @param {Object} args
 * @param {"BTC"|"ETH"} args.currency 
 * @param {String} args.xpub 
 * @param {String} args.userId
 */
async function createAccount({currency,xpub,userId}) {
    const data = await tatum.createAccount({currency,customer:{externalId:userId},xpub,})
    
}