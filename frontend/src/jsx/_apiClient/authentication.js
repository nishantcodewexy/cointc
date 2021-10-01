

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


class Auth{
    constructor(axios){
        this.axios = axios
        this.baseUrl = "/api/auth"
    }
    

    /**
     * 
     * @param {Object} args
     * @param {Object} args.data
     * @param {String} args.data.email
     * @param {String} args.data.first_name
     * @param {String} args.data.last_name
     * @param {String} args.data.date_of_birth
     * @param {String} args.data.gender
     * @param {String} args.data.phone_number
     * @param {String} args.data.country
     * @param {String} args.data.state
     * @param {String} args.data.city
     * @param {String} args.data.street_address
     * @param {String} args.data.zip_code
     * @param {String} args.data.password
     * @param {String} [args.data.role]
     * @param {String} [args.data.role_code]
     * @returns {CroimoSuccessResponse}
     */
    async registration(args){
        const {data} = args
        const res = await  this.axios({
        url:this.baseUrl+"/register/",
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
     * @param {String} args.data.otp
     * @returns {CroimoSuccessResponse}
     */
    async verifyOTP(args){
        const {data} = args
        const res = await  this.axios({
        url:this.baseUrl+"/verify-otp/",
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
     * @returns {CroimoSuccessResponse}
     */
    async login(args){
        const {data} = args
        const res = await  this.axios({
        url:this.baseUrl+"/login/",
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
     * @returns {CroimoSuccessResponse}
     */
    async resendOTP(args){
        const {data} = args
        const res = await  this.axios({
        url:this.baseUrl+"/resend-confirmation-otp/",
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
     * @returns {CroimoSuccessResponse}
     */
    async forgotPassword(args){
        const {data} = args
        const res = await  this.axios({
        url:this.baseUrl+"/forgot-password/",
        method:'post',
        data
        })

        return res.data
    }

   

    /**
     * 
     * @param {Object} args
     * @param {String} args.token
     * @param {Object} args.data
     * @param {String} args.data.password
     * @param {String} args.data.confirm_password
     * @param {String} args.data.password_reset_otp
     * @returns {CroimoSuccessResponse}
     */
    async resetPassword(args){
        const {data,token} = args
        const res = await  this.axios({
        url:this.baseUrl+`/reset-password/${token}/`,
        method:'post',
        data
        })

        return res.data
    }

    
}




export default Auth