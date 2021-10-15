import Service from "./Services";

export default class InitService {
  constructor(options = { token: null, timeout: 30000, baseURL: "/api" }) {

    let providers = {
      user: require("./user.service").default,
      group: require("./group.service").default,
      account: require("./account.service").default,
      currency: require("./currency.service").default,
      chat: require("./chat.service").default,
      wallet: require("./wallet.service").default,
      support_ticket: require("./support.ticket.service").default,
    };
    this.options = options;

    this._provision(providers);
    console.log(this);
    // this.user = new UserService(options);
    // this.group = new GroupService(options);
    return this;
  }

  _providers = {};

  /**
   * @function registerService - registers new service
   * @param {Class} Service
   * @param {Object} options
   */
  _provision = (providers) => {
    try {
      Object.keys(providers).forEach((key, idx) => {
        if (!providers instanceof Service)
          throw new Error(`Service(${idx}) not a valid service object`);

        let useServiceName = `use${this._camelFirstLetter(key)}Service`;

        const fn = (options = this.options) => new providers[key](options);
        this._providers[useServiceName] = fn;

        this[key] = new providers[key](this.options);
        this[useServiceName] = fn;
      });
    } catch (error) {
      console.error(error);
    } finally {
      console.log("Available providers", this._providers);
    }
  };

  _camelFirstLetter = (name) =>
    name
      .split("_")
      .map(
        (item) => item?.charAt(0).toUpperCase() + item.substr(1).toLowerCase()
      )
      .join("");

  _nameProvider = (Provider) => Provider?._name || Provider?.name;
}
