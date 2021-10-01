import axios from 'axios';
import User from './users.all';






class Client{
    constructor(token){
        this.source = axios.CancelToken.source();
    
        let headers;
    
        
    
        if(token){
          headers = {
            "Content-Type": "application/json",
            "Authorization":`JWT ${token}`
          }
        }else{
          headers = {
            "Content-Type": "application/json"
          }
        }
    
      this.axios = axios.create({
        // baseURL: 'https://some-domain.com/api/',
        timeout: 30000,
        headers,
        cancelToken: this.source.token
      });
    
    
      this.Auth = new User(this.axios)
      
 
      }
    
    
      abort(message="request has been cancel"){
        this.source.cancel(message)
      }
}


const useSdk = () => new Client()

export default useSdk