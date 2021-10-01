

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


 class Beneficiary{
    constructor(axios){
        this.axios = axios
        this.baseUrl = "/api/beneficiaries"
    }
    

    /**
     * 
     * @param {Object} args
     * @param {Object} [args.CROIMOUSER]
     * @param {String} args.CROIMOUSER.id
     * @param {Object} [args.USD]
     * @param {String} args.USD.routing_number
     * @param {String} args.USD.account_name
     * @param {Number} args.USD.account_number
     * @param {String} args.USD.account_type
     * @param {String} args.USD.bank_name
     * @param {String} args.USD.phone_number
     * @param {String} args.USD.email
     * @param {String} args.USD.street_address
     * @param {String} args.USD.city
     * @param {String} args.USD.state
     * @param {String} args.USD.country
     * @param {String} args.USD.zip_code
     * @param {String} args.USD.image
     * @param {Object} [args.WAF]
     * @param {String} args.WAF.swift_code
     * @param {String} args.WAF.sort_code
     * @param {String} args.WAF.account_name
     * @param {Number} args.WAF.account_number
     * @param {String} args.WAF.account_type
     * @param {String} args.WAF.bank_name
     * @param {String} args.WAF.phone_number
     * @param {String} args.WAF.email
     * @param {String} args.WAF.street_address
     * @param {String} args.WAF.city
     * @param {String} args.WAF.state
     * @param {String} args.WAF.country
     * @param {String} args.WAF.zip_code
     * @param {String} args.WAF.image
     * @returns {CroimoSuccessResponse}
     */
    async create(args){
        const {WAF,USD,CROIMOUSER} = args
        
        let data = new FormData();

        if(CROIMOUSER){
            data.append("type","croimo_account")
            
            for (let key in CROIMOUSER){
                data.append(key,CROIMOUSER[key])
            }

            
        }else if(USD){
            data.append("type","USD")
            
            for (let key in USD){
                data.append(key,USD[key])
            }

        }else if(WAF){
            data.append("type","WAF")
            
            for (let key in WAF){
                data.append(key,WAF[key])
            }

        }else{
            throw new Error("no account type selected")
        }

        const res = await  this.axios({
        url:this.baseUrl+"/",
        method:'post',
        data,
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




export default Beneficiary