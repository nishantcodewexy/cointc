import Services from "./Services";

/**
 * Class of all Group services
 * @class
 */
export default class SupportTicketServices extends Services {
  constructor(init) {
    super(init);
    this._name = "SUPPORT_TICKET";
    return this;
  }
  // SUPPORT TICKET --------------------------------------------------------------------------
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
  retrieveSupportTicket = async function ({id, params}) {
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
  updateSupportTicket = async ({id, data}) => {
    return await this.decorate(
      async () =>
        await this.axios(`tickets/${id}`, {
          method: "PUT",
          data,
        })
    );
  };
  /**
   * @function bulkUpdateSupportTicket - Bulk update support ticket (**Admin only**)
   * @param {ticketPayload []} data
   * @returns
   */
  bulkUpdateSupportTicket = async (data) => {
    return await this.decorate(
      async () =>
        await this.axios(`tickets`, {
          method: "PUT",
          data,
        })
    );
  };
}
