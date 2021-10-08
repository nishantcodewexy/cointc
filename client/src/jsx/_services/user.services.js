import helpers from "../_helpers";
import axios from "axios";
import { useSelector } from "react-redux";

/**
 * Class of all Group services
 * @class
 */
class UserServices {
  constructor({ headers, timeout = 30000, baseURL = "/account" }) {
    this.source = axios.CancelToken.source();
    this.axios = axios.create({
      baseURL,
      timeout,
      headers,
      cancelToken: this.source.token,
    });
    return this;
  }

  /**
   * @method
   * @param {String | "request has been canceled"} message
   * @returns {String}
   */
  abort = (message = "request has been canceled") => {
    this.source.cancel(message.toString());
  };

  /**
   * @method - Request handler decorator
   * @param {Function} request - Request Callback
   * @returns
   */
  decorate = async (request) => {
    let result = { success: null, error: null };
    try {
      let { data } = await request();
      return { ...result, success: data };
    } catch (error) {
      console.error("ACCOUNT USER SERVICE ERROR::", error);
      this.abort();
      return { ...result, error: error?.message };
    }
  };

  /*************** LOGIN ***************/
  login = async (data) => {
    const config = {
      method: "POST",
      data,
    };
    return await this.axios("authenticate", config);
  };

  /**************** REGISTER ************/
  register = async (data) => {
    const config = {
      method: "POST",
      data,
    };
    return await this.axios(``, config);
  };
}

function useUserService() {
  const session = useSelector((state) => state?.session);
  return new UserServices({
    headers: helpers.headers(session),
    baseURL: "/api/account",
  });
}
export default useUserService;
