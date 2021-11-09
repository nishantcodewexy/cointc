import Services from "./Services";

/**
 * Class of all Group services
 * @class
 */
export default class UserServices extends Services {
  constructor(init) {
    super(init);
    this._name = "USER";
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
        await this.axios("auth/login", {
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

}


