import {io,Socket} from 'socket.io-client'

 class SocketClient{
    constructor(token){
        this.token = token
        
    }
    

    /**
     * @param {Object} args
     * @param {String} args.url
     * @param {Object} args.params
     * @returns {Socket}
     */
    async getAuthSocket(args){
        const {url,params} = args
        const socket = io(url||"ws://localhost:8000",{
            auth: {
                token: this.token
              },
            params
        })

        return socket
    }





}




export default SocketClient