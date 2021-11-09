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


  // USER --------------------------------------------------------------------------------

  /**
   * @function bulkCreateUser - Bulk create user - (**Admins only**)
   * @param {Object} data
   * @returns
   */
  bulkCreateUser = async (data) => {
    return await this.decorate(async () =>
      this.axios(`user`, {
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
        await this.axios(`user`, {
          method: "GET",
          params,
        })
    );
  };

  retrieveUser = async ({ id, ...params }) => {
    return await this.decorate(
      async () =>
        await this.axios(`user/${id}`, {
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
        await this.axios(`/user`, {
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
        await this.axios(`user/${id}`, {
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
        await this.axios(`user/${id}`, {
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
  bulkRemoveUser = async (data) => {
    return await this.decorate(
      async () =>
        await this.axios(`/user`, {
          method: "DELETE",
          data,
        })
    );
  };

  bulkRetrieveSecurities = async (params) => {
    return await this.decorate(
      async () =>
        await this.axios(`/user`, {
          method: "GET",
          params,
        })
    );
  };

  getReferrals = async (params) => {
    return await this.decorate(
      async () =>
        await this.axios(`/referral`, {
          method: "GET",
          params,
        })
    );
  };

  getKYC = async (params) => {
    return await this.decorate(
      async () =>
        await this.axios(`/kyc`, {
          method: "GET",
          params,
        })
    );
  };

  updateKYC = async ({id, data}) => {
    return await this.decorate(
      async () =>
        await this.axios(`/kyc/${id}`, {
          method: "PUT",
          data,
        })
    );
  }
  // findAdverts = async ({id, data}) => {
  //   return await this.decorate(
  //     async () =>
  //       await this.axios(`/advert/${id}`, {
  //         method: "Get",
  //         data,
  //       })
  //   );
  // }


  findAdvert = async (params) => {
    return await this.decorate(
      async () =>
        await this.axios(`ad/`, {
          method: "GET",
          params,
        })
    );
  };
 
  bulkOrder = async (params) => {
    return await this.decorate(
      async () =>
        await this.axios(`order`, {
          method: "GET",
          params,
        })
    );
  };
 

}

export default AccountService;
