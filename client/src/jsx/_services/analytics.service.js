import Services from "./Services";

/**
 * Class of all Group services
 * @class
 */
export default class AnalyticsServices extends Services {
  constructor(init) {
    super(init);
    this._name = "ANALYTICS";
    return this;
  }
  //ANALYTICS ---------------------------------------------------------------------

  getADS = async (params) => {
    return await this.decorate(
      async () =>
        await this.axios(`ad`, {
          method: "GET",
          params,
        })
    );
  };

  getOrders = async (params) => {
    return await this.decorate(
      async () =>
        await this.axios(`order`, {
          method: "GET",
          params,
        })
    );
  };
}
