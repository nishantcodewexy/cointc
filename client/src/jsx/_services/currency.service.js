import Services from "./Services";

/**
 * Class of all Group services
 * @class
 */
export default class CurrencyServices extends Services {
  constructor(init) {
    super(init);
    this._name = "CURRENCY";
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
}
