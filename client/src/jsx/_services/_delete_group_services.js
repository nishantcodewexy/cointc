
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
        await this.axios(`bank-details`, {
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
  return await axios(`advert`, {
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
  return await axios(`trade`, {
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
  return await axios(`policies`, {
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
  return await axios(`/referrals`, {
    method: "GET",
    params,
  });
}
