import _constants from "../_constants";
import _services from "../_services";
import _helpers from "../_helpers";
import alertAction from "./alert.action";

const { userServices } = _services;
const { userConstants } = _constants;
const { historyHelpers } = _helpers;

const userActions = {
  login,
  logout,
  register,
  delete: _delete,
};
export default userActions;

function login({ email, password, from }) {
  return (dispatch) => {
    dispatch(request({ email }));

    userServices.login(email, password).then(
      (user) => {
        dispatch(success(user));
        window.location
        historyHelpers.push(from);
      },
      (error) => {
        console.log('In error')
        dispatch(failure(error.toString()));
        dispatch(alertAction.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function profile() {
  return (dispatch) => {
    dispatch(request());
    userServices.fetchProfile().then(
      (user) => {
        success(user);
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertAction.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: userConstants.PROFILE_REQUEST };
  }
  function success(user) {
    return { type: userConstants.PROFILE_SUCCESS, user };
  }
  function failure() {
    return { type: userConstants.PROFILE_FAILURE };
  }
}
function logout() {
  userServices.logout();
  return { type: userConstants.LOGOUT };
}

function register(user) {
  return (dispatch) => {
    dispatch(request(user));

    userServices.register(user).then(
      (user) => {
        dispatch(success());
        historyHelpers.push("/login");
        dispatch(alertAction.success("Registration successful"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertAction.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
}

function _delete(id) {
  return (dispatch) => {
    dispatch(request(id));

    userServices.delete(id).then(
      (user) => dispatch(success(id)),
      (error) => dispatch(failure(id, error.toString()))
    );
  };

  function request(id) {
    return { type: userConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: userConstants.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: userConstants.DELETE_FAILURE, id, error };
  }
}
