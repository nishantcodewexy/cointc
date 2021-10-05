import _helpers from "../_helpers";
import _constants from "../_constants";
import axios from "axios";

let { headers } = _helpers;

class GroupServices {
  constructor({ headers, timeout = 30000, baseURL }) {
    this.source = axios.CancelToken.source();
    this.axios = axios.create({
      baseURL,
      timeout,
      headers,
      cancelToken: this.source.token,
    });
    return this;
  }

  abort = (message = "request has been cancel") => {
    this.source.cancel(message.toString());
  };
  /**
   * @function - Request handler decorator
   * @param {Function} request - Request Callback
   * @returns
   */
  decorate = async (request) => {
    let result = { success: null, error: null };
    try {
      let { data } = await request();
      return { ...result, success: data };
    } catch (error) {
      console.error("GROUP SERVICE ERROR::", error);
      this.abort();
      return { ...result, error };
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
   * @function getCurrency - Gets adverts (**Admin only**)
   * @param {Object} params
   * @param {Number} [params.limit] - Response limit
   * @param {String} [params.name]- Specify the currency name
   * @param {String} [params.type]- Specify the currency name
   * @returns
   */

  getCurrency = async (params) => {
    return await this.decorate(
      async () =>
        await this.axios(`currency`, {
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
  /**
   * KYC payload types definition
   * @typedef {Object} kycUpdatePayload
   * @property {String} uid - User ID
   * @property {Object} email - Email KYC object
   * @property {Object} id - ID KYC object
   * @property {Object} otp - OTP KYC object
   * @property {Object} payment_methods - Payment methods KYC object
   * @property {Object} bank_details - Bank details KYC object
   * @property {Object} sms - SMS KYC object
   */
  /**
   * KYC payload types definition
   * @typedef {Object} kycPayload
   * @property {"email" | "id" | "payment_methods" | "bank_details" | "sms" | "otp"} type
   */
  /**
   * @function getKYC - Fetch KYC (**Admins only**)
   * @param {kycPayload} params
   * @returns
   */
  getKYC = async (params) => {
    return this.decorate(
      async () =>
        await this.axios(`kyc`, {
          method: "GET",
          params,
        })
    );
  };

  /**
   * @function updateKYC - Bulk KYC update (**Admins only**)
   * @param {kycUpdatePayload []} data
   * @returns
   */
  updateKYC = async (data) => {
    return this.decorate(
      async () =>
        await this.axios(`kyc`, {
          method: "PUT",
          data,
        })
    );
  };

  /************************* USER ******************************/
  /**
   * @function getUsers - Gets one or many users (**Admins only**)
   * @param {Object} params
   * @param {String} [params.id] - User ID
   * @returns
   */
  getUsers = async (params) => {
    return this.decorate(
      async () =>
        await this.axios(`user`, {
          method: "GET",
          params,
        })
    );
  };

  /**
   * @function createUsers - Bulk create user - (**Admins only**)
   * @param {Object} data
   * @param {"basic" | "admin"} data.role
   * @param {String} data.email
   * @returns
   */
  createUsers = async (data) => {
    return await this.decorate(async () =>
      this.axios(`user`, {
        method: "POST",
        data,
      })
    );
  };

  /**
   * @function updateUsers - Bulk update users (**Admins only**)
   * @param {Object} data
   * @param {String} data.phone
   * @param {String} data.country
   * @param {String} data.permission
   * @param {String} data.role
   * @returns
   */
  updateUsers = async (data) => {
    return this.decorate(
      async () =>
        await this.axios(`user`, {
          method: "PUT",
          data,
        })
    );
  };

  /**
   * @function dropUsers - Bulk delete users (**Admins only**)
   * @param {String []} data - Array of user ID to delete from
   * @returns
   */
  dropUsers = async (data) => {
    return await this.decorate(
      async () =>
        await this.axios(`user`, {
          method: "DELETE",
          data,
        })
    );
  };
}

export default new GroupServices({
  headers: headers(),
  baseURL: "/account/group",
});
const url_prefix = "/account/group";

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
 * @function getSupportTicket - Gets adverts (**Admin only**)
 * @param {Object} params
 * @param {Number} [params.limit] - Response limit
 * @param {String} [params.name] - Specify the currency name
 * @returns
 */
async function getSupportTicket(params) {
  return await axios(`${url_prefix}/support`, {
    headers,
    method: "GET",
    params,
  });
}

/**
 * @function updateSupportTicket - Bulk update support ticket (**Admin only**)
 * @param {ticketPayload []} data
 * @returns
 */
async function updateSupportTicket(data) {
  return await axios(`${url_prefix}/support`, {
    headers,
    method: "PUT",
    data,
  });
}

/************************* WALLET ******************************/
/**
 * @function getWallet - Gets wallets (**Admin only**)
 * @param {Object} params
 * @param {Number} [params.limit] - specify response limit
 * @param {"all" | "withdrawal" | "deposits"} [params.type] - wallet type
 * @returns
 */
async function getWallet(params) {
  return await axios(`${url_prefix}/wallet`, {
    headers: headers,
    method: "GET",
    params,
  });
}

/**
 * @function getWalletBalance - Gets a wallet balances (**Admins only**)
 * @param {Object} params
 * @param {Object} [params.id] - Wallet ID
 * @param {Object} [params.limit] - Response limit
 * @returns
 */
async function getWalletBalance(params) {
  return await axios(`${url_prefix}/balance`, {
    headers,
    method: "GET",
    params,
  });
}

/************************* ADVERTS ******************************/
/**
 * @function getAdvert - Gets one or many adverts (**Admin only**)
 * @param {Object} params
 * @param {Number} [params.limit] - specify response limit
 * @param {String} [params.id] - specify the advert id
 * @param {"all" | "sell" | "buy"} [params.type] - specify the advert type
 * @param {String} [params.pairs] - specify the advert currency pair
 * @param {Number} [params.min_limit] - specify the advert minimum limit
 * @param {Number} [params.max_limit] - specify the advert maximum limit
 * @param {String} [params.uid] - specify the advert user id
 * @returns
 */
async function getAdvert(params) {
  return await axios(`${url_prefix}/advert`, {
    headers,
    method: "GET",
    params,
  });
}
/***************************** TRADE ******************************/
/**
 * @function getTrades - Gets trades (**Admin only**)
 * @param {Object} params
 * @param {Number} [params.limit] - Specify response limit
 * @param {"all" | "buy" | "dispute"} [params.type]- Specify trade type
 * @returns
 */
async function getTrades(params) {
  return await axios(`${url_prefix}/trade`, {
    headers,
    method: "GET",
    params,
  });
}

/************************************* POLICY **********************************/
/**
 * @function getPolicy - Gets policies (**Admin only**)
 * @param {Object} params
 * @param {Number} [params.limit] - Specify response limit
 * @param {"all" | "withdrawal_fee"} params.type - Specify policy type
 * @returns
 */
async function getPolicy(params) {
  return await axios(`${url_prefix}/policies`, {
    headers,
    method: "GET",
    params,
  });
}

/************************************* REFERRALS **********************************/
/**
 * @function getReferrals - Gets bulk referrals (**Admin only**)
 * @param {Object} params
 * @param {Number} [params.limit] - Specify response limit
 * @param {String} [params.id] - Specify referral ID
 * @returns
 */
async function getReferrals(params) {
  return await axios(`${url_prefix}/referrals`, {
    headers,
    method: "GET",
    params,
  });
}
