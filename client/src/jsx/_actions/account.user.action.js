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

function login({ email, password, role = "basic", from }) {
  return (dispatch) => {
    dispatch(log({ type: NOTICE.CLEAR}))
    dispatch(log({ type: REQUEST.SESSION_LOGIN, data: email }));

    user
      .login({ email, password, role })
      .then(({ data }) => {
        // localStorage.setItem("user", JSON.stringify(data));
        dispatch(log({ type: SESSION.LOGIN, data }));
      })
      .catch((error) => {
        dispatch(
          log({
            type: NOTICE.ERROR,
            data: error.response.data.message.toString(),
          })
        );
      });
  };
}

function logout() {
  return (dispatch) => {
    dispatch(log({ type: REQUEST.SESSION_LOGOUT }));
    // localStorage.removeItem("user");
    dispatch(log({ type: REQUEST.CLEAR}))
    dispatch(log({ type: NOTICE.CLEAR}))
    dispatch(log({ type: SESSION.LOGOUT }));
  };
}

function register(credentials) {
  return (dispatch) => {
    dispatch(log({ type: NOTICE.CLEAR}))
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

function profile() {
  return (dispatch) => {
    dispatch(log({ type: NOTICE.CLEAR}))
    dispatch(log({ type: REQUEST.USER_PROFILE }));
  };
}

function drop(id) {
  return (dispatch) => {
    dispatch(log({ type: NOTICE.CLEAR}))
    dispatch(log({ type: REQUEST.USER_DROP, data: id }));
  };
}

function log({ type = NOTICE.INFO, data = null }) {
  return { type, data };
}
