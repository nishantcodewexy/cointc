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
 * @param {Number} quantity
 * @returns {Promise<void>}
 */
async function freezeWallet(wallet,quantity) {
    
    if(quantity){
        /**
         * @type {tatum.BlockAmount}
         */
        let blockAmount  = {}
        blockAmount.amount = quantity
        blockAmount.type = "ORDER"
        tatum.blockAmount(wallet.tatum_account_id)
    }else{
        await tatum.freezeAccount(wallet.tatum_account_id)

    }
    
}


/**
 * 
 * @param {Object} params
 * @param {Object} params.wallet 
 * @param {String} params.wallet.account_id
 * @param {String} params.blockageId
 * @returns {Promise<void>}
 */
async function unfreezeWallet({wallet,blockageId}) {
    if(blockageId){
        return tatum.deleteBlockedAmount(blockageId)
    }else if(wallet){

        return await tatum.deleteBlockedAmountForAccount(wallet.account_id)
    }
    
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
 * @param {Object} wallet.tatum_account_id
 * @returns {Promise<tatum.Address[]>}
 */
async function getWalletAddress(wallet){
    return await tatum.getDepositAddressesForAccount(wallet.tatum_account_id)
}






/**
 * 
 * @param {Object} from
 * @param {String} from.tatum_account_id
 * @param {Object} to
 * @param {String} to.tatum_account_id
 * @param {Number} qty
 * @returns {Promise<{reference: string}>}
 */
async function transferBetweenWallet(from,to,qty) {
    
    /**
     * @type {tatum.CreateTransaction}
     */
    let body = {}

    body.amount = qty
    body.senderAccountId = from.tatum_account_id
    body.recipientAccountId =  to.tatum_account_id
    return await tatum.storeTransaction(body)
    
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
    transferBetweenWallet,
    getWalletAddress
}


