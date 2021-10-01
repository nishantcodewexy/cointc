

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


 class Wallet{
    constructor(axios){
        this.axios = axios
        this.baseUrl = "/api/wallets"
    }
    

    /**
     * 
     * @param {Object} args
     * @param {Object} args.data
     * @param {"CFA"|"USD"} args.data.type
     * @param {Number} args.data.amount
     * @returns {CroimoSuccessResponse}
     */
    async create(args){
        const {data} = args
        

        const res = await  this.axios({
        url:this.baseUrl+"/",
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
     * @param {Object} args.data
     * @param {"CFA"|"USD"} args.data.type
     * @param {Number} args.data.amount
     * @returns {CroimoSuccessResponse}
     */
    async update(args){
        const {id,data} = args
        const res = await  this.axios({
        url:this.baseUrl+`/${id}/`,
        method:'put',
        data
        })

        return res.data
    }


}




export default Wallet