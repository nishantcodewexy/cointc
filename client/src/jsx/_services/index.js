import UserService from "./user.services";
import GroupService from "./group.service";

const services = {
  init: (options) => ({
    user: new UserService(options),
    group: new GroupService(options),
  }),
};

export default services;
