

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


 class User{
    constructor(axios){
        this.axios = axios
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
        url:"/api/users/",
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
        url:`/api/users/${id}/`,
        method:'get'
        })

        return res.data
    }

    /**
     * 
     * @param {Object} args
     * @param {String} args.id
     * @param {Object} args.data
     * @param {String} args.data.current_password
     * @param {String} args.data.password
     * @param {String} args.data.confirm_password
     * @returns {CroimoSuccessResponse}
     */
    async changePassword(args){
        const {id,data} = args
        const res = await  this.axios({
        url:`/api/users/change-password/${id}/`,
        method:'post',
        data
        })

        return res.data
    }

    /**
     * 
     * @param {Object} args
     * @param {String} args.id
     * @param {Object} args.data
     * @param {String} [args.data.first_name]
     * @param {String} [args.data.last_name]
     * @param {String} [args.data.date_of_birth]
     * @param {String} [args.data.gender]
     * @param {String} [args.data.phone_number]
     * @param {String} [args.data.country]
     * @param {String} [args.data.state]
     * @param {String} [args.data.city]
     * @param {String} [args.data.street_address]
     * @param {String} [args.data.zip_code]
     * @param {String} [args.data.email]
     * @returns {CroimoSuccessResponse}
     */
    async update(args){
        const {id,data} = args
        const res = await  this.axios({
        url:`/api/users/${id}/`,
        method:'put',
        data
        })

        return res.data
    }


    /**
     * 
     * @param {Object} args
     * @param {String} args.id
     * @param {Object} args.data
     * @param {String} args.data.password
     * @returns {CroimoSuccessResponse}
     */
    async delete(args){
        const {id,data} = args
        const res = await  this.axios({
        url:`/api/users/${id}/`,
        method:'delete',
        data
        })

        return res.data
    }


}




export default User