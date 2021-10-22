import Services from "./Services";

class AccountService extends Services {
  constructor(init) {
    super(init);
    this._name = "ACCOUNT";
    return this;
  }

  //LOGIN ----------------------------------------------------------------------
  /**
   * @function login - log user to platform
   * @param {Object} data
   * @returns
   */
  login = async (data) => {
    return await this.decorate(
      async () =>
        await this.axios("auth/authenticate", {
          method: "POST",
          data,
        })
    );
  };

  //REGISTER ----------------------------------------------------------------------
  /**
   * @function register - Register user into platform
   * @param {Object} data
   * @returns
   */
  register = async (data) => {
    return await this.decorate(
      async () =>
        await this.axios(`auth/register`, {
          method: "POST",
          data,
        })
    );
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
export default AccountService;
