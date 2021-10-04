

 class Wallet{
    constructor(axios){
        this.axios = axios
        this.baseUrl = "/api/wallets"
    }
    

    /**
     * 
     * @returns {Promise}
     */
    async balance(){
        const res = await  this.axios({
        url:`/wallet/balanceOf/`,
        method:'get'
        })

        return res.data
    }


    /**
     * 
     * @returns {Promise}
     */
    async wallet(){
        const res = await  this.axios({
        url:`/wallet/`,
        method:'get'
        })

        return res.data
    }



}




export default Wallet