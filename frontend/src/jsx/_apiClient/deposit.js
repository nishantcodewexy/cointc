

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


 class Deposit{
    constructor(axios){
        this.axios = axios
        this.baseUrl = "/api/deposits"
    }
    

    /**
     * 
     * @param {Object} args
     * @param {Object} args.data
     * @param {"bank"|"other"} args.data.source
     * @param {String} args.data.source_id
     * @param {"wallet"|"other"} args.data.target
     * @param {String} args.data.target_id
     * @param {String} args.data.current_rate
     * @param {String} args.data.amount
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

   

}




export default Deposit