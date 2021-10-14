import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import helpers from "../_helpers";

/**
 * Class of all Group services
 * @class
 */

class GroupServices {
  constructor({ headers, timeout = 30000, baseURL = "/account/group" }) {
    this.source = axios.CancelToken.source();
    this.headers = headers;
    this.axios = axios.create({
      baseURL,
      timeout,
      headers,
      cancelToken: this.source.token,
    });
    return this;
  }

  getHeaders = () => this.headers;
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
    let result = { success: null, statusCode: null, error: null };
    try {
      let { data, status } = await request();
      return { ...result, success: data };
    } catch (error) {
      console.error("GROUP SERVICE ERROR::", { error });
      this.abort();
      return {
        ...result,
        statusCode: error?.response?.status,
        error: error?.message,
      };
    }
  };

  /************************* CURRENCY ******************************/
  /**
   * Currency payload type definition
   * @typedef {Object} currencyPayload
   * @property {String} id - Currency id
   * @property {String} name - Currency name
   * @property {String} type - Currency type
   */
  /**
   * @method getCurrency - Gets adverts (**Admin only**)
   * @param {Object} params
   * @param {Number} [params.limit] - Response limit
   * @param {String} [params.name]- Specify the currency name
   * @param {String} [params.type]- Specify the currency name
   * @returns
   */

  listCurrency = async (params) => {
    return await this.decorate(
      async () =>
        await this.axios(`currency`, {
          method: "GET",
          params,
        })
    );
  };

  getCurrency = async (id, params) => {
    return await this.decorate(
      async () =>
        await this.axios(`currency/${id}`, {
          method: "GET",
          params,
        })
    );
  };

  /**
   * @function createCurrency - Creates a currency (**Admin only**)
   * @param {currencyPayload} data
   * @returns
   */
  createCurrency = async (data) => {
    return await this.decorate(
      async () =>
        await this.axios(`currency`, {
          method: "POST",
          data,
        })
    );
  };
  updateCurrency = async (data) => {
    return await this.decorate(
      async () =>
        await this.axios(`currency`, {
          method: "PUT",
          data,
        })
    );
  };

  dropCurrency = async (data) => {
    return await this.decorate(
      async () =>
        await this.axios(`currency`, {
          method: "DELETE",
          data,
        })
    );
  };

  /************************* WALLET ******************************/
  /**
   * @function getWallet - Gets wallets (**Admin only**)
   * @param {Object} params
   * @param {Number} [params.limit] - specify response limit
   * @param {"all" | "withdrawal" | "deposits"} [params.type] - wallet type
   * @returns
   */
  getWallet = async (params) => {
    return await axios(`/wallet`, {
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
    return await axios(`/balance`, {
      method: "GET",
      params,
    });
  };

  /************************** STATISTICS *************************/

  /**
   * Statistics payload types definition
   * @typedef {Object} statsPayload
   * @property {"user_stats" | "withdrawal_stats" | "ticket_stats" | "admin_stats" | "security_stats" | "kyc_stats" | "deposit_stats"} type
   */

  /**
   *@function getStats - Gets account statistics (***Admins only**)
   * @param {statsPayload} params
   * @returns
   */
  getStats = async (params) => {
    return await this.decorate(
      async () =>
        await this.axios(`stats`, {
          method: "GET",
          params,
        })
    );
  };

  /************************** KYC *************************/

  listBankDetail = async (params) => {
    return await this.decorate(
      async () =>
        await this.axios(`bank-details`, {
          method: "GET",
          params,
        })
    );
  };

  getBankDetail = async (id, params) => {
    return await this.decorate(
      async () =>
        await this.axios(`bank-details/${id}`, {
          method: "GET",
          params,
        })
    );
  };

  createBankDetail = async (data) => {
    return await this.decorate(
      async () =>
        await this.axios(`bank-details`, {
          method: "POST",
          data,
        })
    );
  };
  updateBankDetail = async ({ id, ...data }) => {
    console.log({ data });
    return await this.decorate(
      async () =>
        await this.axios(`bank-details/${id}`, {
          method: "PUT",
          data,
        })
    );
  };
  dropBankDetail = async ({ id, ...data }) => {
    return await this.decorate(
      async () =>
        await this.axios(`bank-details/${id}`, {
          method: "DELETE",
          data,
        })
    );
  };
  bulkDropBankDetail = async (data) => {
    return await this.decorate(
      async () =>
        await this.axios(`bank-details`, {
          method: "DELETE",
          data,
        })
    );
  };

  /************************* USER ******************************/
  /**
   * @function bulkListUsers - Gets one or many users (**Admins only**)
   * @param {Object} params
   * @param {String} [params.id] - User ID
   * @returns
   */
  bulkRetrieveUsers = async (params) => {
    return await this.decorate(
      async () =>
        await this.axios(`users`, {
          method: "GET",
          params,
        })
    );
  };
  retrieveUser = async (id, params) => {
    return await this.decorate(
      async () =>
        await this.axios(`users/${id}`, {
          method: "GET",
          params,
        })
    );
  };

  /**
   * @function bulkCreateUser - Bulk create user - (**Admins only**)
   * @param {Object} data
   * @returns
   */
  bulkCreateUsers = async (data) => {
    return await this.decorate(async () =>
      this.axios(`users`, {
        method: "POST",
        data,
      })
    );
  };

  /**
   * @function bulkUpdateUsers - Bulk update users (**Admins only**)
   * @param {Object} data
   * @returns
   */
  bulkUpdateUsers = async (data) => {
    return await this.decorate(
      async () =>
        await this.axios(`users`, {
          method: "PUT",
          data,
        })
    );
  };
  /**
   * @function updateUser -  update single users (**Admins only**)
   * @param {Object} payload
   * @param {String} payload.id
   * @param {String} payload.data
   * @returns
   */
  updateUser = async ({ id, data }) => {
    return await this.decorate(
      async () =>
        await this.axios(`users/${id}`, {
          method: "PUT",
          data,
        })
    );
  };

  /**
   * @function removeUser - Bulk delete users (**Admins only**)
   * @param {String} id
   * @returns
   */
  removeUser = async ({ id, data }) => {
    return await this.decorate(
      async () =>
        await this.axios(`users/${id}`, {
          method: "DELETE",
          data,
        })
    );
  };
  /**
   * @function bulkDropUsers - Bulk delete users (**Admins only**)
   * @param {String []} data - Array of IDs to delete from
   * @returns
   */
  bulkRemoveUsers = async (data) => {
    return await this.decorate(
      async () =>
        await this.axios(`users`, {
          method: "DELETE",
          data,
        })
    );
  };

  /**
   * @function listChatHistory - list chat histories (**Admins only**)
   * @returns
   */
  listChatHistory = async (params) => {
    return await this.decorate(
      async () =>
        await this.axios(`chat-history`, {
          method: "GET",
          params,
        })
    );
  };

  /************************* SUPPORT TICKETS ******************************/
  /**
   * Support ticket payload types definition
   * @typedef {Object} ticketPayload
   * @property {String} id - Support ticket id
   * @property {String} [status] - Support ticket status
   * @property {String} [subject] - Support ticket status
   * @property {String} [ticket_no] - Support ticket status
   */

  /**
   * @function listSupportTickets - Gets adverts (**Admin only**)
   * @param {Object} params
   * @param {Number} [params.limit] - Response limit
   * @param {String} [params.name] - Specify the currency name
   * @returns
   */
  listSupportTickets = async function (params) {
    return await this.decorate(
      async () =>
        await this.axios(`tickets`, {
          method: "GET",
          params,
        })
    );
  };
  /**
   * @function getSupportTicket - Gets adverts (**Admin only**)
   * @param {Object} params
   * @param {Number} [params.limit] - Response limit
   * @param {String} [params.name] - Specify the currency name
   * @returns
   */
  getSupportTicket = async function (id, params) {
    return await this.decorate(
      async () =>
        await this.axios(`tickets/${id}`, {
          method: "GET",
          params,
        })
    );
  };

  /**
   * @function updateSupportTicket - Update single support ticket (**Admin only**)
   * @param {Object} data
   * @returns
   */
  updateSupportTicket = async (id, data) => {
    return await this.decorate(
      async () =>
        await this.axios(`tickets/${id}`, {
          method: "PUT",
          data,
        })
    );
  };
  /**
   * @function updateBulkSupportTicket - Bulk update support ticket (**Admin only**)
   * @param {ticketPayload []} data
   * @returns
   */
  updateSupportTicket = async (data) => {
    return await this.decorate(
      async () =>
        await this.axios(`tickets`, {
          method: "PUT",
          data,
        })
    );
  };
}

/* ****************************************** */
export default function useGroupService() {
  const session = useSelector((state) => state?.session);

  return new GroupServices({
    headers: helpers.headers(session),
    baseURL: "/api",
  });
}
