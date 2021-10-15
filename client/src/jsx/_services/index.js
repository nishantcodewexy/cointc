// SERVICES
import UserService from "./user.services";
import GroupService from "./group.service";

export default class InitService {
  constructor(init = { headers: null, timeout: 30000, baseURL: "/api" }) {
    console.log(init);
    this.user = new UserService(init);
    this.group = new GroupService(init);
    this._initializer = init;
    return this;
  }
  
  /**
   * @function registerService - registers new service
   * @param {Class} Service
   * @param {Object} options
   */
  registerService(Service, options) {
    this[Service?._name || Service?.name] = new Service(
      options || this._initializer
    );
  }

  useUserService = (init = this._initializer) => new UserService(init);
  useGroupService = (init = this._initializer) => new GroupService(init);
}
