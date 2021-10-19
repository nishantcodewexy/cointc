const boom = require("@hapi/boom");
const {
  roles: { admin, basic },
} = require("../consts");

module.exports = {
  isUser: async (req) => {
    const {
      auth: {
        credentials: { user },
      },
    } = req;
    
    return user;
  },

  isBasicOrError: async (req) => {
    const {
      auth: {
        credentials: { user },
      },
    } = req;
    if (user?.role === basic) return user;
    throw boom.forbidden("Unauthorized! User is not basic");
  },

  /**
   * @function isAdminOrError - return true if is admin or throw an error
   * @param {Request} req
   * @returns {Boolean}
   */
  isAdminOrError: async (req) => {
    const {
      auth: {
        credentials: { user },
      },
    } = req;
    // if (!user) return false;
    if (user?.role === admin) return user;
    throw boom.forbidden("Unauthorized! User is not an administrator");
  },
};
