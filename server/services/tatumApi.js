const axios = require('axios').default;
const assert = require("assert")
const tatum = require("@tatumio/tatum")

/*
  mnemonic: 'organ merit dune hotel essence basic riot buzz dirt impact damage auto sing soap glow giraffe glare eye damage chunk orphan verify awake buyer',
  const xpub = 'tpubDE4LDjyTNBXcv25ZZo1E9kaAABuG5hmMZ24PnEqhkfMTgJrhPsU3UMRAwtNtJJdGK2vNmWPCjeommeZ76JckVdoY1Fwj8ASvxgt2pjas6s3'
  const privateKey = 'cUSHCyB2HH8vZJeF3iSbSr5ERRHGSNHTuMYJC6dB8ipVqbFYURLw'
  user_id = '086d48d9-24bf-4720-bf67-f41dd5d7553c'
 */


  axios.request({
      url
  })

class Ledger{
    /**
     * 
     * @param {axios} axios 
     */
    constructor(axios){
        this.baseURL = "/ledger"
        
        /**
         * @type {axios}
         */
        this.axios = axios
        
        
        
    }


    /**
     * 
     * @param {Object} args 
     * @param {String} args.id
     * @returns {Promise}
     */
    getAccountById(args){
        const {id} = args
        return this.axios.request({
            url:`${this.baseURL}/account/${id}/`,
            
        })
    }

    


    /**
     * 
     * @param {Object} args 
     * @param {String} args.id
     * @returns {Promise}
     */
    getAccountBalance(args){
        const {id} = args
        return this.axios.request({
            url:`${this.baseURL}/account/${id}/balance`,
        })
    }

    /**
     * 
     * @param {Object} args 
     * @param {String} args.id
     * @returns {Promise}
     */
     freezeAccount(args){
        const {id} = args
        return this.axios.request({
            url:`${this.baseURL}/account/${id}/freeze`,
            method:"PUT"
        })
    }



    /**
     * 
     * @param {Object} args 
     * @param {String} args.id
     * @returns {Promise}
     */
     unfreezeAccount(args){
        const {id} = args
        return this.axios.request({
            url:`${this.baseURL}/account/${id}/unfreeze`,
            method:"PUT"
        })
    }
    

    /**
     * 
     * @param {Object} args 
     * @param {tatum.Account} args.data
     * @returns {Promise}
     */
     createAccount(args){
        const {data} = args
        return this.axios.request({
            url:`${this.baseURL}/account/`,
            method:"POST",
            data
        })
    }


    /**
     * 
     * @param {Object} args
     * @param {Object} args.params
     * @returns {Promise}
     */
     listAllAccounts(args){
        const {params} = args
        
        return this.axios.request({
            url:`${this.baseURL}/account/`,
            method:"GET",
            params
        })
    }




}



/**
 * this client is ment to intract with the api while the wallet service is use to 
 * to create methods to interface between the api client and coinTC
 */

class TatumAPI{
    constructor(){
        // check if api key is available
        assert(process.env.TATUM_API_KEY,"TATUM_API_KEY was not provided")

        this.axios = axios.create({
            baseURL: 'https://api-eu1.tatum.io',
            timeout: 1000,
            headers: {
                'x-api-key': process.env.TATUM_API_KEY,
                'Content-Type': 'application/json'
            }
        });

        this.Account = new Ledger(this.axios)


    }

}


module.exports = new TatumAPI()