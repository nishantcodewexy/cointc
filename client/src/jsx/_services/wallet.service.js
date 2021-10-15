import Services from "./Services";

/**
 * Class of all Group services
 * @class
 */
export default class WalletServices extends Services {
  constructor(init) {
    super(init);
    this._name = "WALLET";
    return this;
  }
  
  /************************* WALLET ******************************/
  /**
   * @function getWallet - Gets wallets (**Admin only**)
   * @param {Object} params
   * @param {Number} [params.limit] - specify response limit
   * @param {"all" | "withdrawal" | "deposits"} [params.type] - wallet type
   * @returns
   */
   getWallet = async (params) => {
    return await this?.axios(`/wallet`, {
      method: "GET",
      params,
    });
  };

  /**
   * @function getWalletBalance - Gets a wallet balances (**Admins only**)
   * @param {Object} params
   * @param {Object} [params.id] - Wallet ID
   * @param {Object} [params.limit] - Response limit
   * @returns
   */
  getWalletBalance = async (params) => {
    return await this?.axios(`/balance`, {
      method: "GET",
      params,
    });
  };
}
