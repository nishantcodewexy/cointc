import Services from "./Services";

/**
 * Class of all Group services
 * @class
 */
export default class BankDetailServices extends Services {
  constructor(init) {
    super(init);
    this._name = "BANK_DETAIL";
    return this;
  }
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

  bulkRetrieve = async (params) => {
    return await this.decorate(
      async () =>
        await this.axios(`bank-details`, {
          method: "GET",
          params,
        })
    );
  };

  retrieve = async ({ id, params }) => {
    return await this.decorate(
      async () =>
        await this.axios(`bank-details/${id}`, {
          method: "GET",
          params,
        })
    );
  };

  update = async ({ id, ...data }) => {
    console.log({ data });
    return await this.decorate(
      async () =>
        await this.axios(`bank-details/${id}`, {
          method: "PUT",
          data,
        })
    );
  };

  remove = async ({ id, ...data }) => {
    return await this.decorate(
      async () =>
        await this.axios(`bank-details/${id}`, {
          method: "DELETE",
          data,
        })
    );
  };

  bulkRemove = async (data) => {
    return await this.decorate(
      async () =>
        await this.axios(`bank-details`, {
          method: "DELETE",
          data,
        })
    );
  };
}
