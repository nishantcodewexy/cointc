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
    getAuthSocket(args={}){
        const {params} = args
        
        const socket = io({
            auth: {
                token: this.token
              },
            params
        })

        return socket
    }





}




export default SocketClient