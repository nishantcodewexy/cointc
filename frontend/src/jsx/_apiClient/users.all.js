






class User{
    constructor(axios){
        this.axios = axios
        this.baseUrl = "/api/auth"
    }
    

    /**
     * 
     * @param {Object} args
     * @param {Object} args.data
     * @param {String} args.data.email
     * @param {String} args.data.passsword
     * @param {String} args.data.repeat_password
     * @param {String} args.data.referrer
     * @param {String} args.data.role
     * @returns {Promise}
     */
    async create(args){
        const {data} = args
        const res = await  this.axios({
        url:"/user/create/",
        method:'post',
        data
        })

        return res.data
    }

    /**
     * 
     * @param {Object} args
     * @param {Object} args.params
     * @param {String} args.params.email
     * @param {String} args.params.token
     * @returns {Promise}
     */
    async confirmEmail(args){
        const {params} = args
        const res = await  this.axios({
        url:"/user/confirm_email/",
        method:'get',
        params
        })

        return res.data
    }

    /**
     * 
     * @param {Object} args
     * @param {Object} args.data
     * @param {String} args.data.email
     * @param {String} args.data.password
     * @returns {Promise}
     */
    async authenticate(args){
        const {data} = args
        const res = await  this.axios({
        url:"/user/authenticate/",
        method:'post',
        data
        })

        return res.data
    }


    /**
     * 
     * @returns {Promise}
     */
    async destroy(){
        const res = await  this.axios({
        url:"/user/destroy/",
        method:'post'
        })

        return res.data
    }

    /**
     * 
     * @param {Object} args
     * @param {String} args.id
     * @returns {Promise}
     */
    async retrieve(args){
        const {id} = args
        const res = await  this.axios({
        url:`/user/${id}/`,
        method:'get'
        })

        return res.data
    }

   

    /**
     * 
     * @param {Object} args
     * @param {Object} args.params
     * @returns {Promise}
     */
    async list(args){
        const {params} = args
        const res = await  this.axios({
        url:`/user/`,
        method:'get',
        params
        })

        return res.data
    }


    /**
     * 
     * @param {Object} args
     * @param {"email"|"id"|"phone"|"payment_methods"} args.type
     * @returns {Promise}
     */
    async kyc(args){
        const {type} = args
        const res = await  this.axios({
        url:`/user/kyc/${type}/`,
        method:'post'
        })

        return res.data
    }

    /**
     * 
     * @param {Object} args
     * @param {Object} args.data
     * @param {String} args.data.password
     * @param {String} args.data.repeat_password
     * @returns {Promise}
     */
    async resetPassword(args){
        const {data} = args
        const res = await  this.axios({
        url:`/user/password_reset/`,
        method:'post',
        data
        })

        return res.data
    }

    /**
     * 
     * @param {Object} args
     * @param {Object} args.data
     * @param {String} args.data.email
     * @returns {Promise}
     */
    async requestPasswordReset(args){
        const {data} = args
        const res = await  this.axios({
        url:`/user/request_password_reset/`,
        method:'post',
        data
        })

        return res.data
    }

    /**
     * 
     * @param {Object} args
     * @param {Object} args.data
     * @param {String} args.data.nickname
     * @returns {Promise}
     */
    async update(args){
        const {data} = args
        const res = await  this.axios({
        url:`/user/update/`,
        method:'put',
        data
        })

        return res.data
    }

    
}




export default User