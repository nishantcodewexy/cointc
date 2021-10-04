

 class Advert{
    constructor(axios){
        this.axios = axios
        this.baseUrl = "/api/wallets"
    }
    

    /**
     * @param {Object} args
     * @param {Object} args.data
     * @param {String} args.data.price
     * @param {String} args.data.userId
     * @param {Number} args.data.min_order
     * @param {Number} args.data.max_order
     * @param {String} args.data.payment_method
     * @param {String} args.data.terms_of_trade
     * @param {String} args.data.kind
     * @param {Number} args.data.ttl
     * @param {String} args.data.assert_pair
     * @returns {Promise}
     */
    async create(args){
        const {data} = args
        const res = await  this.axios({
        url:`/advert/create/`,
        method:'post',
        data
        })

        return res.data
    }


    /**
     * 
     * @param {Object} args
     * @param {Object} args.data
     * @param {String} args.data.ad
     * @returns {Promise}
     */
    async destroy(args){
        const {data} = args
        const res = await  this.axios({
        url:`/ads/destroy/`,
        method:'delete',
        data
        })

        return res.data
    }



    /**
     * 
     * @param {Object} args
     * @param {Object} args.params
     * @param {String} args.params.ad
     * @returns {Promise}
     */
    async list(args){
        const {params} = args
        const res = await  this.axios({
        url:`/ads/`,
        method:'post',
        params
        })

        return res.data
    }



}




export default Advert