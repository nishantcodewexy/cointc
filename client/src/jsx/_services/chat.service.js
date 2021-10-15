import Services from "./Services";
import { io, Socket } from "socket.io-client";

/**
 * Class of all Group services
 * @class
 */
export default class ChatService extends Services {
  constructor(init) {
    super(init);
    this._name = "CHAT";
    return this;
  }
  // CHAT --------------------------------------------------------------------------
  /**
   * @function bulkRetrieveChatHistory - list chat histories (**Admins only**)
   * @returns
   */
  bulkRetrieveChatHistory = async (params) => {
    return await this.decorate(
      async () =>
        await this.axios(`chat-history`, {
          method: "GET",
          params,
        })
    );
  };
  /**
   * @param {Object} args
   * @param {String} args.url
   * @param {Object} args.params
   * @returns {Socket}
   */
  authorizeSocket = (args = {}) => {
    const { params } = args;

    const socket = io({
      extraHeaders: {
        authorization: this.getToken(),
      },
      params,
    });

    return socket;
  };
}
