






class AdminUser{
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
     * @returns {Promise}
     */
    async create(args){
        const {data} = args
        const res = await  this.axios({
        url:"/user/admin/create/",
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
     * @param {String} args.data.password
     * @returns {Promise}
     */
    async authenticate(args){
        const {data} = args
        const res = await  this.axios({
        url:"/user/admin/authenticate/",
        method:'post',
        data
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
        url:`/admin/users`,
        method:'get',
        params
        })

        return res.data
    }


    /**
     * 
     * @param {Object} args
     * @param {Object} args.data
     * @param {String[]} args.data.data
     * @param {Boolean} args.data.soft
     * @returns {Promise}
     */
    async delete(args){
        const {data} = args
        const res = await  this.axios({
        url:`/admin/users/`,
        method:'delete',
        data
        })

        return res.data
    }

    /**
     * 
     * @returns {Promise}
     */
    async profile(){
        const res = await  this.axios({
        url:`/user/admin/profile`,
        method:'get'
        })

        return res.data
    }



    
}




export default AdminUser