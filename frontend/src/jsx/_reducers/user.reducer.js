import _constants from "../_constants";

const { userConstants } = _constants;

const initialState = { user: null, token: null };

// load user data from local store
let user = JSON.parse(localStorage.getItem("user"));

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    default:
      return state;
  }
}
