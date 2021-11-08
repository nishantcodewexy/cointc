import Services from "./Services";

/**
 * Class of all Group services
 * @class
 */
export default class BankDetailervices extends Services {
  constructor(init) {
    super(init);
    this._name = "BANK_DETAIL";
    return this;
  }
  //BANK DETAIL ---------------------------------------------------------------------
  create = async (data) => {
    return await this.decorate(
      async () =>
        await this.axios(`bank-detail`, {
          method: "POST",
          data,
        })
    );
  };

  bulkRetrieve = async (params) => {
    return await this.decorate(
      async () =>
        await this.axios(`bank-detail`, {
          method: "GET",
          params,
        })
    );
  };

  retrieve = async ({ id, params }) => {
    return await this.decorate(
      async () =>
        await this.axios(`bank-detail/${id}`, {
          method: "GET",
          params,
        })
    );
  };

  update = async ({ id, ...data }) => {
    console.log({ data });
    return await this.decorate(
      async () =>
        await this.axios(`bank-detail/${id}`, {
          method: "PUT",
          data,
        })
    );
  };

  remove = async ({ id, ...data }) => {
    return await this.decorate(
      async () =>
        await this.axios(`bank-detail/${id}`, {
          method: "DELETE",
          data,
        })
    );
  };

  bulkRemove = async (data) => {
    return await this.decorate(
      async () =>
        await this.axios(`bank-detail`, {
          method: "DELETE",
          data,
        })
    );
  };
}
