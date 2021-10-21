import _constants from "../_constants";
import _services from "../_services";

const { user } = _services;
const { NOTICE, REQUEST, SESSION } = _constants;

const accountUserActions = {
  login,
  logout,
  register,
  drop,
  profile,
};
export default accountUserActions;

/********************************** FUNCTIONS ********************************************/
/**
 * @function login - User login action
 * @param {Object} param
 * @param {String} param.email
 * @param {String} param.password
 * @param {String | "basic"} [param.role]
 * @param {String | "/"} [param.from]
 * @returns
 */
function login(request) {
  return async (dispatch) => {
    dispatch(log({ type: NOTICE.CLEAR }));
    dispatch(log({ type: REQUEST.SESSION_LOGIN }));
    try {
      let { success, error } = await request();
      if (error) throw new Error(error);

      dispatch(log({ type: SESSION.LOGIN, data: success }));
    } catch (error) {
      console.error(error);
      dispatch(
        log({
          type: NOTICE.ERROR,
          data: error?.response?.data?.message || error.toString(),
        })
      );
    }
  };
}

/**
 * @function logout - logs user out
 * @returns
 */
function logout() {
  return (dispatch) => {
    dispatch(log({ type: REQUEST.SESSION_LOGOUT }));
    // localStorage.removeItem("user");
    dispatch(log({ type: REQUEST.CLEAR }));
    dispatch(log({ type: NOTICE.CLEAR }));
    dispatch(log({ type: SESSION.LOGOUT }));
  };
}

/**
 * @function register - Create or register a new user
 * @param {Object} credentials
 * @returns
 */
function register(credentials) {
  return (dispatch) => {
    dispatch(log({ type: NOTICE.CLEAR }));
    dispatch(log({ type: REQUEST.USER_REGISTER }));

    user
      .register(credentials)
      .then(({ data }) => {
        dispatch(log({ type: SESSION.REGISTER, data }));
        // dispatch(alertAction.success("Registration successful"));
      })
      .catch((error) => {
        dispatch(log({ type: NOTICE.ERROR, data: error.toString() }));
        // dispatch(alertAction.error(error.response.data.message.toString()));
      });
  };
}

/**
 * @function profile - Fetch user's profile information
 * @returns
 */
function profile() {
  return (dispatch) => {
    dispatch(log({ type: NOTICE.CLEAR }));
    dispatch(log({ type: REQUEST.USER_PROFILE }));
  };
}

/**
 *
 * @function drop - Soft deletes user
 * @returns
 */
function drop() {
  return (dispatch) => {
    dispatch(log({ type: NOTICE.CLEAR }));
    dispatch(log({ type: REQUEST.USER_DROP }));
  };
}

/**
 * @function log - action logger
 * @param {Object} param - action object
 * @param {String} [param.type] - Type of action
 * @param {*} [param.data] - Action payload
 * @returns
 */
function log({ type = NOTICE.INFO, data = null }) {
  return { type, data };
}
