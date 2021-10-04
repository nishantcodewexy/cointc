import axios from "axios";
import { useSelector } from "react-redux";
import Advert from "./advert.regular";
import SocketClient from "./socket.regular";
import AdminUser from "./user.admin";
import User from "./users.regular";
import Wallet from "./wallet.regular";

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
    this.source.cancel(message);
  }
}

const useAPI = () =>{
  const {token} = useSelector(state => state?.user?.user||{})
  
  return new Client(token)
};

export default useAPI;
