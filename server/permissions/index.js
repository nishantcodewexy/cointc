const boom = require("@hapi/boom");
const {
  roles: { admin, basic },
} = require("../consts");

module.exports = {
  /**
   *
   * @param {Request} req - request object
   * @returns {Boolean}
   */
  isAdmin: async (req) => {
    try {
      const {
        auth: {
          credentials: { user },
        },
      } = req;
      // if (!user) return false;
      if (!user)
        throw boom.forbidden("Unauthorized! User is not an administrator");
      return user.role === admin;
    } catch (error) {
      return false;
    }
  },
  /**
   *
   * @param {Request} req - request object
   * @returns {Boolean}
   */
  isBasic: async (req) => {
    const {
      auth: {
        credentials: { user },
      },
    } = req;
    if (!user) throw boom.forbidden("Unauthorized! User is not basic");
    // if (!user) return false;
    return user?.role === basic;
  },
  /**
   * return true if is admin or throw an error
   * @param {Request} req
   * @returns {Boolean}
   */
  isAdminOrError: async (req) => {
    const {
      auth: {
        credentials: { user },
      },
    } = req;
    debugger;
    if (!user) throw boom.forbidden("unauthorized");
    const isAdmin = user.role === admin;
    debugger;
    if (!isAdmin) throw boom.forbidden("unauthorized");

    return isAdmin;
  },
};
