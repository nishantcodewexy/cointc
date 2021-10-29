const boom = require("@hapi/boom");

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
    if (user?.access_level >= 1) return user;
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
    if (user?.access_level >= 2) return user;
    throw boom.forbidden("Unauthorized! User is not an administrator");
  },

  isSuperAdminOrError: async (req) => {
    const {
      auth: {
        credentials: { user },
      },
    } = req;
    // if (!user) return false;
    if (user?.access_level >= 3) return user;
    throw boom.forbidden("Unauthorized! User is not an administrator");
  },
};
