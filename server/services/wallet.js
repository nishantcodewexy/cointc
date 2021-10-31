const tatum = require("@tatumio/tatum");




/**
 * 
 * @param {Object} args
 * @param {String} args.currency 
 * @param {String} args.xpub 
 * @param {String} args.user_id
 * @param {tatum.Fiat} [args.accountingCurrency]
 * @returns {Promise<tatum.Account>}
 */
async function createAccount({currency,xpub,user_id,accountingCurrency}) {
    
    return await tatum.createAccount({currency,customer:{externalId:user_id},xpub,accountingCurrency}) 
}





/**
 * 
 * @param {Object} wallet - Wallet model
 * @param {String} wallet.account_id
 * @returns {Promise<tatum.AccountBalance>}
 */
async function getWalletBalance(wallet) {
    return await tatum.getAccountBalance(wallet.account_id)
    
}


/**
 * 
 * @param {Object} wallet 
 * @param {String} wallet.tatum_account_id
 * @returns {Promise<void>}
 */
async function freezeWallet(wallet) {
    await tatum.freezeAccount(wallet.tatum_account_id)
    
}

/**
 * 
 * @param {Object} wallet 
 * @param {String} wallet.account_id
 * @returns {Promise<void>}
 */
async function unfreezeWallet(wallet) {
    await tatum.unfreezeAccount(wallet.account_id)
    
}


/**
 * 
 * @param {Object} params
 * @param {Number} params.pageSize
 * @param {Number} params.offset
 * @param {Object} params.user
 * @param {String} params.user.id
 * @returns {Promise<tatum.Account[]>}
 */
async function getUserTatumAccounts({user,pageSize,offset}){
    const data = await tatum.getAccountsByCustomerId(user.id,pageSize,offset)
    return data
}



/**
 * 
 * @param {Object} wallet
 * @param {String} wallet.tatum_account_id
 * @param {tatum.TransferBtcBasedOffchainKMS} body 
 * @returns {Promise<tatum.SignatureId>}
 */
async function transferBtc(wallet,body) {
    body.senderAccountId = wallet.tatum_account_id
    return await tatum.offchainTransferBtcKMS(body)
}







/**
 * 
 * @param {Object} param
 * @param {tatum.TransactionFilter} [param.filter={}]
 * @param {Number} param.limit
 * @param {Number} param.offset
 * @param {Object} param.user
 * @param {String} param.user.id
 * @returns {Promise<tatum.Transaction[]>}
 */
async function getTransactionsByUser({user,filter={},limit,offset}){
    
    return await tatum.getTransactionsByCustomer(
        {...filter,id:user.id},
        limit,
        offset
        )
}



/**
 * 
 * @param {Object} param
 * @param {tatum.TransactionFilter} [param.filter={}]
 * @param {Number} param.limit
 * @param {Number} param.offset
 * @param {Object} param.wallet
 * @param {String} param.wallet.account_id
 * @param {String} param.wallet.user_id
 * @returns {Promise<tatum.Transaction[]>}
 */
async function getTransactionsByWallet({wallet,filter={},limit,offset}){
    
    return await tatum.getTransactionsByAccount(
        {...filter,id:wallet.user_id,account:wallet.account_id},
        limit,
        offset
        )
}



/**
 * 
 * @param {Object} params
 * @param {Object} params.wallet 
 * @param {String} params.wallet.tatum_account_id
 * @param {Number} [params.index]
 * @returns {Promise<tatum.Address>}
 */
async function createAddressFromWallet({wallet,index=0}) {
    return await tatum.generateDepositAddress(wallet.tatum_account_id,index)
}




module.exports = {
    createAccount,
    getWalletBalance,
    freezeWallet,
    unfreezeWallet,
    getUserTatumAccounts,
    getTransactionsByUser,
    getTransactionsByWallet,
    createAddressFromWallet,
    transferBtc
}


