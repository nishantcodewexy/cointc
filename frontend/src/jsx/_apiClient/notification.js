

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


 class Notificaton{
    constructor(axios){
        this.axios = axios
        this.baseUrl = "/api/notifications"
    }
    

    /**
     * 
     * @param {Object} args
     * @param {Object} args.data
     * @param {"auto"|"user|"transfer"|"other"} args.data.source
     * @param {"announcement"|"deposit"|"withdrawal"|"exchange"|"transfer"|"other"} args.data.type
     * @param {"all-users"|"single-user"|"moderator"|"admin"|"other"} args.data.for
     * @param {String[]} args.data.to - ["all-users"|"moderator"|"admin"|user_id1|user_id2|user_idn]
     * @param {String} args.data.message
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
     * @param {Boolean} args.data.read
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




export default Notificaton