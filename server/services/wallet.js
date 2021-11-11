const tatum = require("@tatumio/tatum");
const tatumApi = require("./tatumApi");





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
 * @param {String} from.signature_id
 * @param {String} from.currency
 * @param {Object} to
 * @param {String} to.tatum_account_id
 * @param {String} to.address
 * @param {Number} qty
 * @returns {Promise<{reference: string}>}
 */
async function transferBetweenWallet(from,to,qty) {
    
    /**
     * @type {tatum.CreateTransaction}
     */
    // let body = {}

    // body.amount = qty
    // body.senderAccountId = from.tatum_account_id
    // body.recipientAccountId =  to.tatum_account_id
    // return await tatum.storeTransaction(body)
    
    let body = {}
    if(from.currency==tatum.Currency.BTC){
        // {
        //     "senderAccountId": "5e68c66581f2ee32bc354087",
        //     "address": "mpTwPdF8up9kidgcAStriUPwRdnE9MRAg7",
        //     "amount": "0.001",
        //     "compliant": false,
        //     "fee": "0.0005",
        //     "multipleAmounts": [
        //     "0.1"
        //     ],
        //     "attr": "string",
        //     "signatureId": "26d3883e-4e17-48b3-a0ee-09a3e484ac83",
        //     "xpub": "xpub6EsCk1uU6cJzqvP9CdsTiJwT2rF748YkPnhv5Qo8q44DG7nn2vbyt48YRsNSUYS44jFCW9gwvD9kLQu9AuqXpTpM1c5hgg9PsuBLdeNncid",
        //     "paymentId": "1234",
        //     "senderNote": "Sender note"
        //     }

        const {xpub} = await tatum.getAccountById(from.tatum_account_id)
        body.senderAccountId = from.tatum_account_id
        body.signatureId = from.signature_id
        body.address = to.address
        body.amount = qty?.toString()
        body.xpub = xpub
        body.compliant = false


    }else if(from.currency==tatum.Currency.ETH){
        // {
        // "nonce": 0,
        // "address": "0x687422eEA2cB73B5d3e242bA5456b782919AFc85",
        // "amount": "100000",
        // "compliant": false,
        // "signatureId": "26d3883e-4e17-48b3-a0ee-09a3e484ac83",
        // "index": 0,
        // "paymentId": "1234",
        // "senderAccountId": "5e68c66581f2ee32bc354087",
        // "senderNote": "Sender note",
        // "gasLimit": "40000",
        // "gasPrice": "20"
        // }
        

        body.senderAccountId = from.tatum_account_id
        body.address = to.address
        body.amount = qty?.toString()
        body.compliant = false
        body.signatureId = from.signature_id

    }else if(from.currency==tatum.Currency.XRP){
        // {
        // "senderAccountId": "35ab5ea8e48c4b179cadea653c6d732e",
        // "account": "rPRxSZzTFd6Yez3UMxFUPJvnhUhjewpjfV",
        // "address": "rPRxSZzTFd6Yez3UMxFUPJvnhUhjewpjfV",
        // "amount": "10000",
        // "compliant": false,
        // "attr": "12355",
        // "sourceTag": 12355,
        // "paymentId": "1234",
        // "signatureId": "26d3883e-4e17-48b3-a0ee-09a3e484ac83",
        // "senderNote": "Sender note"
        // }

        body.senderAccountId = from.tatum_account_id
        body.address = to.address
        body.amount = qty?.toString()
        body.compliant = false
        body.signatureId = from.signature_id
    }

    

    return await tatumApi.OffChain.blockchainTransfer({data:body,currency:from.currency})
    

    
    
}


/**
 * 
 * @param {Object} from
 * @param {String} from.tatum_account_id
 * @param {String} address
 * @param {Number} qty
 * @returns {Promise<{reference: string}>}
 */
async function transferToAddress(from,address,qty) {
    
    /**
     * @type {tatum.CreateTransaction}
     */
    // let body = {}

    // body.amount = qty
    // body.senderAccountId = from.tatum_account_id
    // body.recipientAccountId =  to.tatum_account_id
    // return await tatum.storeTransaction(body)

    /**
     * @type {tatum.TransactionKMS}
     */
    let body = {}
    

    return await tatum.signOneKMSTransaction()
    
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
    getWalletAddress,
    transferToAddress
}


