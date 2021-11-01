const boom = require("@hapi/boom");

module.exports = {
  isUser: async (req) => {
    const {
      auth: {
        credentials: { user },
      },
      query: { sudo = false, faker = false},
    } = req;   

    return {
      ...user, 
      isAdmin:user?.isAdmin && sudo,
      isSuperAdmin:user?.isSuperAdmin && sudo,
      sudo, 
      faker
    };
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
      query: { sudo = false},
    } = req;
    // if (!user) return false;
    if (user?.access_level >= 2 && sudo) return user;
    throw boom.forbidden("Unauthorized! User is not an administrator");
  },

  isSuperAdminOrError: async (req) => {
    const {
      auth: {
        credentials: { user },
      },
      query: { sudo = false},
    } = req;
    // if (!user) return false;
    if (user?.access_level >= 3 && sudo) return user;
    throw boom.forbidden("Unauthorized! User is not an administrator");
  },
};
