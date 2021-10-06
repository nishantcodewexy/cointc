import axios from "axios";
import { useSelector } from "react-redux";
import Advert from "./advert.regular";
import SocketClient from "./socket.regular";
import AdminUser from "./user.admin";
import User from "./users.regular";
import Wallet from "./wallet.regular";
import * as Qs from 'qs'

class Client {
  constructor(token) {
    this.source = axios.CancelToken.source();
    this.token = token;
    let headers;

    if (token) {
      headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
    } else {
      headers = {
        "Content-Type": "application/json",
      };
    }

    this.axios = axios.create({
      // baseURL: 'https://some-domain.com/api/',
      timeout: 30000,
      headers,
      cancelToken: this.source.token,
      paramsSerializer: function (params) {
        return Qs.stringify(params, {arrayFormat: 'brackets'})
      },
    });

    this.Admin = {
      User: new AdminUser(this.axios),
    };

    this.User = new User(this.axios);
    this.Wallet = new Wallet(this.axios);
    this.Advert = new Advert(this.axios);
    this.SocketClient = new SocketClient(this.token);
  }

  abort(message = "request has been cancel") {
    try{

      this.source.cancel(message);
    }catch(e){}
  }
}

const useAPI = () =>{
  const {token} = useSelector(state => state?.session?.user||{})
  
  return new Client(token)
};

export default useAPI;
