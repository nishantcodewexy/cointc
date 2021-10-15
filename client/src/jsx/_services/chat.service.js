import Services from "./Services";

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
}
