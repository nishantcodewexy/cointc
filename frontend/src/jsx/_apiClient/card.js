

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


 class Card{
    constructor(axios){
        this.axios = axios
        this.baseUrl = "/api/cards"
    }
    

    /**
     * 
     * @param {Object} args
     * @param {Object} args.data
     * @param {Object} args.data.full_name
     * @param {Object} args.data.cvc
     * @param {Object} args.data.card_number
     * @param {Object} args.data.expiry_date
    
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




export default Card