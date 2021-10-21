import axios from "axios";
import Qs from "qs";
import helpers from "../_helpers";

export default class Services {
  constructor(init) {
    this._name = "ROOT";
    this.token = init?.token;
    this.baseURL = init?.baseURL;
    this.timeout = init?.timeout;
    this.source = axios.CancelToken.source();
    this._initializer = init;
    this.headers = this.token && helpers.headers(init?.token);

    this.setupAxios({
      headers: this?.headers,
      baseURL: this?.baseURL,
      timeout: this?.timeout,
      cancelToken: this.source.token,
      paramsSerializer: function (params) {
        return Qs.stringify(params, { arrayFormat: "brackets" });
      },
    });

    this.decoratorMessage = `${this._name}::SERVICE ERROR`;

    return this;
  }

  setupAxios(config) {
    this.axios = axios.create(config);
  }

  getHeaders = () => this.headers;
  getToken = () => this.token;

  /**
   * @method
   * @param {String | "request has been canceled"} message
   * @returns {String}
   */
  abort = (message = "Reload page") => {
    this.source.cancel(message.toString());
  };

  setDecoratorMessage(message) {
    this.decoratorMessage = message;
  }

  /**
   * @method - Request handler decorator
   * @param {Function} request - Request Callback
   * @returns
   */
  decorate = async (request) => {
    let result = { message: "", data: null, statusCode: null, error: null };
    try {
      let { data } = await request();
      return { ...result, data };
    } catch (error) {
      let resp = {};
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(error.response.data);
        resp = { ...error.response.data };
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        // console.log(error.request);
        resp = { ...error.request };
      } else {
        // Something happened in setting up the request that triggered an Error
        // console.log("Error", error.message);
        resp = { error, message: error.message, statusCode: 500 };
      }
      return { ...resp, config: error.config };
      // console.log(error.config);
      // console.log(error.toJSON());
    }
  };
}
