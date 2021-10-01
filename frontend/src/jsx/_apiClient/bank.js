

/**
 * @typedef CroimoSuccessResponse
 * @property {"success"} status
 * @property {Sting} message
 * @property {Object} data
 * 
 */

/**
 * @typedef CroimoErrorResponse
 * @property {"failed"} status
 * @property {Sting} message
 * @property {Object} data
 * 
 */


 class Bank{
    constructor(axios){
        this.axios = axios
        this.baseUrl = "/api/bankaccounts/"
    }
    

    /**
     * 
     * @param {Object} args
     * @param {Object} [args.USD]
     * @param {String} args.USD.routing_number
     * @param {String} args.USD.account_name
     * @param {Number} args.USD.account_number
     * @param {String} args.USD.account_type
     * @param {String} args.USD.bank_name
     * @param {Object} [args.WAF]
     * @param {String} args.WAF.swift_code
     * @param {String} args.WAF.sort_code
     * @param {String} args.WAF.account_name
     * @param {Number} args.WAF.account_number
     * @param {String} args.WAF.account_type
     * @param {String} args.WAF.bank_name
     * @returns {CroimoSuccessResponse}
     */
    async create(args){
        const {WAF,USD} = args
        let data = {}
        if(USD){
            data = {
                ...USD,
                type:"USD"
            }
        }else if(WAF){
            data = {
                ...WAF,
                type:"WAF"
            }
        }else{
            throw new Error("no bank type selected")
        }
        const res = await  this.axios({
        url:this.base+"/",
        method:'post',
        data
        })

        return res.data
    }

    /**
     * 
     * @param {Object} args
     * @param {Object} args.params
     * @returns {CroimoSuccessResponse}
     */
    async list(args){
        const {params} = args
        const res = await  this.axios({
        url:this.baseUrl+"/",
        method:'get',
        params
        })

        return res.data
    }

    /**
     * 
     * @param {Object} args
     * @param {String} args.id
     * @returns {CroimoSuccessResponse}
     */
    async retrieve(args){
        const {id} = args
        const res = await  this.axios({
        url:this.baseUrl+`/${id}/`,
        method:'get'
        })

        return res.data
    }

   

    /**
     * 
     * @param {Object} args
     * @param {String} args.id
     * @returns {CroimoSuccessResponse}
     */
    async delete(args){
        const {id} = args
        const res = await  this.axios({
        url:this.baseUrl+`/${id}/`,
        method:'delete'
        })

        return res.data
    }


}




export default Bank