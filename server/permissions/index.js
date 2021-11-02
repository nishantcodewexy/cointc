const boom = require("@hapi/boom");

module.exports = {
  /**
   * @function isUser - Check user constraints
   * @param {Request} req
   * @returns {Boolean}
   */
  isUser: async (req) => {
    const {
      auth: {
        credentials: { user },
      },
    } = req;

    return { user, ...getQueryConstraints(req) };
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
    let constraints = getQueryConstraints(req);
    if (user?.access_level >= 2)
      return { user, ...constraints, sudo: true };
    throw boom.forbidden("Unauthorized! User is not an administrator");
  },

  /**
   * @function isSuperAdminOrError - return true if user is super-admin or throw an error
   * @param {Object} req - Request Object
   * @returns
   */
  isSuperAdminOrError: async (req) => {
    const {
      auth: {
        credentials: { user },
      },
      query,
    } = req;
    let constraints = getQueryConstraints(req);
    if (user?.access_level >= 3)
      return {
        user,
        ...constraints,
        sudo: true
      };
    throw boom.forbidden("Unauthorized! User is not an super administrator");
  },
};

function getQueryConstraints(req) {
  const {
    auth: {
      credentials: { user },
    },
    query,
  } = req;
  let sudo = query?.sudo ? Boolean(JSON.parse(query?.sudo)) : false;
  sudo = sudo && user?.access_level > 1 ? true : false;
  const fake = query?.fake ? Boolean(JSON.parse(query?.fake)) : false;
  const fake_count = query?.fake_count ? JSON.parse(query?.fake_count) : 30;
  return {
    sudo,
    fake,
    fake_count,
  };
}
