import Services from "./Services";

/**
 * Class of all Group services
 * @class
 */

export default class GroupServices extends Services {
  constructor(init) {
    super(init);
    this._name = "GROUP";
    return this;
  }

  //  CURRENCY ------------------------------------------------------------------------------
  /**
   * Currency payload type definition
   * @typedef {Object} currencyPayload
   * @property {String} id - Currency id
   * @property {String} name - Currency name
   * @property {String} type - Currency type
   * @property {String} iso_code - Currency ISO Code
   */
  /**
   * @method getCurrency - Gets adverts (**Admin only**)
   * @param {Object} params
   * @param {Number} [params.limit] - Response limit
   * @param {String} [params.name] - Specify the currency name
   * @param {String} [params.type] - Specify the currency name
   * @returns
   */

  bulkRetrieveCurrency = async (params) => {
    return await this.decorate(
      async () =>
        await this.axios(`currency`, {
          method: "GET",
          params,
        })
    );
  };

  /**
   * @function retrieveCurrency - Retrieve single currency record
   * @param {Object} payload
   * @param {String} payload.id
   * @param {Object} payload.params
   * @returns
   */
  retrieveCurrency = async ({ id, params }) => {
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
  /**
   * @function bulkCreateCurrency - Creates a currency (**Admin only**)
   * @param {currencyPayload} data
   * @returns
   */
  bulkCreateCurrency = async (data) => {
    return await this.decorate(
      async () =>
        await this.axios(`currency/bulk`, {
          method: "POST",
          data,
        })
    );
  };

  //TODO: Bulk Currency create
  /**
   * @function updateCurrency - Update a single currency
   * @param {Object} payload
   * @param {String} payload.id
   * @param {Object} payload.data
   * @returns
   */
  updateCurrency = async ({ id, data }) => {
    return await this.decorate(
      async () =>
        await this.axios(`currency/${id}`, {
          method: "PUT",
          data,
        })
    );
  };

  /**
   * @function dropCurrency - Delete a single currency record
   * @param {Object} payload
   * @param {Object} payload.id
   * @param {Object} payload.data
   * @returns
   */
  dropCurrency = async ({ id, data }) => {
    return await this.decorate(
      async () =>
        await this.axios(`currency/${id}`, {
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

  //STATISTICS ---------------------------------------------------------------------

  /**
   * Statistics payload types definition
   * @typedef {Object} statsPayload
   * @property {"user_stats" | "withdrawal_stats" | "ticket_stats" | "admin_stats" | "security_stats" | "kyc_stats" | "deposit_stats"} type
   */

  /**
   *@function bulkRetreieveStats - Gets account statistics (***Admins only**)
   * @param {statsPayload} params
   * @returns
   */
  bulkRetreieveStats = async (params) => {
    return await this.decorate(
      async () =>
        await this.axios(`stats`, {
          method: "GET",
          params,
        })
    );
  };

  //BANK DETAIL ---------------------------------------------------------------------
  createBankDetail = async (data) => {
    return await this.decorate(
      async () =>
        await this.axios(`bank-details`, {
          method: "POST",
          data,
        })
    );
  };

  bulkRetrieveBankDetail = async (params) => {
    return await this.decorate(
      async () =>
        await this.axios(`bank-details`, {
          method: "GET",
          params,
        })
    );
  };

  retrieveBankDetail = async ({ id, params }) => {
    return await this.decorate(
      async () =>
        await this.axios(`bank-details/${id}`, {
          method: "GET",
          params,
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

  removeBankDetail = async ({ id, ...data }) => {
    return await this.decorate(
      async () =>
        await this.axios(`bank-details/${id}`, {
          method: "DELETE",
          data,
        })
    );
  };

  bulkRemoveBankDetail = async (data) => {
    return await this.decorate(
      async () =>
        await this.axios(`bank-details`, {
          method: "DELETE",
          data,
        })
    );
  };

  // USER --------------------------------------------------------------------------------

  /**
   * @function bulkCreateUser - Bulk create user - (**Admins only**)
   * @param {Object} data
   * @returns
   */
  bulkCreateUser = async (data) => {
    return await this.decorate(async () =>
      this.axios(`users`, {
        method: "POST",
        data,
      })
    );
  };

  /**
   * @function bulkListUsers - Gets one or many users (**Admins only**)
   * @param {Object} params
   * @param {String} [params.id] - User ID
   * @returns
   */
  bulkRetrieveUser = async (params) => {
    return await this.decorate(
      async () =>
        await this.axios(`users`, {
          method: "GET",
          params,
        })
    );
  };

  retrieveUser = async ({ id, ...params }) => {
    return await this.decorate(
      async () =>
        await this.axios(`users/${id}`, {
          method: "GET",
          params,
        })
    );
  };

  /**
   * @function bulkUpdateUsers - Bulk update users (**Admins only**)
   * @param {Object} data
   * @returns
   */
  bulkUpdateUser = async (data) => {
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
   * @function bulkRemoveUser - Bulk delete users (**Admins only**)
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

  // SUPPORT TICKET --------------------------------------------------------------------------
  //
  /**
   * Support ticket payload types definition
   * @typedef {Object} ticketPayload
   * @property {String} id - Support ticket id
   * @property {String} [status] - Support ticket status
   * @property {String} [subject] - Support ticket status
   * @property {String} [ticket_no] - Support ticket status
   */

  /**
   * @function bulkRetrieveSupportTickets - Gets adverts (**Admin only**)
   * @param {Object} params
   * @param {Number} [params.limit] - Response limit
   * @param {String} [params.name] - Specify the currency name
   * @returns
   */
  bulkRetrieveSupportTickets = async function (params) {
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
/* function useGroupService() {
  const session = useSelector((state) => state?.session);

  return new GroupServices({
    headers: helpers.headers(session),
    baseURL: "/api",
  });
} */
