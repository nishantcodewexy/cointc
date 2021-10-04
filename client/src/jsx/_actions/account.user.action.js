import _constants from "../_constants";
import _services from "../_services";
import _helpers from "../_helpers";
import alertAction from "./alert.action";

const { userService } = _services;
const { userConstant } = _constants;
const { historyHelper } = _helpers;

const accountUserActions = {
  login,
  logout,
  register,
  drop,
  profile,
};
export default accountUserActions;

function login({ email, password, role, from }) {
  return (dispatch) => {
    dispatch(request({ email }));

    userService
      .login({email, password, role})
      .then(({ data }) => {
        localStorage.setItem("user", JSON.stringify(data));
        dispatch(success(data));
      })
      .catch((error) => {
        // console.log("login error", error);
        dispatch(failure({message: error.response.data.message.toString()}));
        dispatch(alertAction.error(error.response.data.message.toString()));
      });
  };

  function request(data) {
    return { type: userConstant.LOGIN_REQUEST, data };
  }
  function success(data) {
    return { type: userConstant.LOGIN_SUCCESS, data };
  }
  function failure(data) {
    return { type: userConstant.LOGIN_FAILURE, data };
  }
}

function profile() {
  return (dispatch) => {
    dispatch(request());
    userService.fetchProfile().then(
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
    return { type: userConstant.PROFILE_REQUEST };
  }
  function success(user) {
    return { type: userConstant.PROFILE_SUCCESS, user };
  }
  function failure() {
    return { type: userConstant.PROFILE_FAILURE };
  }
}
function logout() {
  localStorage.removeItem("user");
  return { type: userConstant.LOGOUT };
}

function register(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.register(user).then(
      (user) => {
        dispatch(success());
        historyHelper.push("/login");
        dispatch(alertAction.success("Registration successful"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertAction.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstant.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: userConstant.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstant.REGISTER_FAILURE, error };
  }
}

function drop(id) {
  return (dispatch) => {
    dispatch(request(id));

    userService.delete(id).then(
      (user) => dispatch(success(id)),
      (error) => dispatch(failure(id, error.toString()))
    );
  };

  function request(id) {
    return { type: userConstant.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: userConstant.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: userConstant.DELETE_FAILURE, id, error };
  }
}
