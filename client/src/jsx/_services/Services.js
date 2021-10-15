import axios from "axios";
import Qs from 'qs';
import helpers from '../_helpers';

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
        return Qs.stringify(params, {arrayFormat: 'brackets'})
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
  abort = (message = "request has been canceled") => {
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
    let result = { success: null, statusCode: null, error: null };
    try {
      let { data, status } = await request();
      return { ...result, success: data };
    } catch (error) {
      console.error(this.decoratorMessage, { error });
      this.abort();
      return {
        ...result,
        statusCode: error?.response?.status,
        error: error?.message,
      };
    }
  };
}
