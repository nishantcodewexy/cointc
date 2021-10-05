import _helpers from "../_helpers";
import _constants from "../_constants";
import axios from "axios";

const { headers } = _helpers;

headers();

const groupServices = {
  getStats,
  getKYC,
  updateKYC,
  getUsers,
  updateUsers,
  createUsers,
  dropUsers,
  getSecessions,
  getSupportTicket,
  updateSupportTicket,
  getCurrency,
  createCurrency,
  getWallet,
  getWalletBalance,
  getAdvert,
  getTrades,
  getPolicy,
  getReferrals,
};

export default groupServices;
const url_prefix = "/account/group";

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
async function getStats(params) {
  return await axios(`${url_prefix}/stats`, {
    headers,
    method: "GET",
    params,
  });
}

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
async function getKYC(params) {
  return await axios(`${url_prefix}/kyc`, {
    headers,
    method: "GET",
    params,
  });
}

/**
 * @function updateKYC - Bulk KYC update (**Admins only**)
 * @param {kycUpdatePayload []} data
 * @returns
 */
async function updateKYC(data) {
  return await axios(`${url_prefix}/kyc`, {
    headers,
    method: "PUT",
    data,
  });
}

/************************* USER ******************************/
/**
 * @function getUsers - Gets one or many users (**Admins only**)
 * @param {Object} params
 * @param {String} [params.id] - User ID
 * @returns
 */
async function getUsers(params) {
  return await axios(`${url_prefix}/user`, {
    headers,
    method: "GET",
    params,
  });
}

/**
 * @function createUsers - Bulk create user - (**Admins only**)
 * @param {Object} data
 * @param {"basic" | "admin"} data.role
 * @param {String} data.email
 * @returns
 */
async function createUsers(data) {
  return await axios(`${url_prefix}/user`, {
    headers,
    method: "POST",
    data,
  });
}

/**
 * @function updateUsers - Bulk update users (**Admins only**)
 * @param {Object} data
 * @param {String} data.phone
 * @param {String} data.country
 * @param {String} data.permission
 * @param {String} data.role
 * @returns
 */
async function updateUsers(data) {
  return await axios(`${url_prefix}/user`, {
    headers,
    method: "PUT",
    data,
  });
}

/**
 * @function dropUsers - Bulk delete users (**Admins only**)
 * @param {String []} data - Array of user ID to delete from
 * @returns
 */
async function dropUsers(data) {
  return await axios(`${url_prefix}/user`, {
    headers,
    method: "DELETE",
    data,
  });
}

/************************* SECESSION ******************************/
/**
 * @function getSecessions - Fetch bulk secession (**Admins only**)
 * @param {Object} params
 * @returns
 */
async function getSecessions(params) {
  return await axios(`${url_prefix}/secession`, {
    headers,
    method: "GET",
    params,
  });
}

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
async function getCurrency(params) {
  return await axios(`/account/currency`, {
    headers,
    method: "GET",
    params,
  });
}

/**
 * @function createCurrency - Creates a currency (**Admin only**)
 * @param {currencyPayload} data
 * @returns
 */
async function createCurrency(data) {
  return await axios(`${url_prefix}/currency`, {
    headers,
    method: "POST",
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
