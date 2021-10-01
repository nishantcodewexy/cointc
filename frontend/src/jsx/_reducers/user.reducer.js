import _constants from "../_constants";

const { userConstants } = _constants;

const initialState = null;

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case userConstants.PROFILE_REQUEST:
      return {
        fetching: true,
      };
    case userConstants.PROFILE_SUCCESS:
      return {
        fetched: true,
        user: action.user,
      };
    case userConstants.PROFILE_FAILURE:
      return {};
    // Login
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
      };
    case userConstants.LOGIN_FAILURE:
      return null;
    case userConstants.LOGOUT:
      return null;
    default:
      return state;
  }
}
