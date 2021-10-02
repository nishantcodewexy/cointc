import _constants from "../_constants";

const { userConstants } = _constants;

const initialState = null;

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case userConstants.PROFILE_REQUEST:
      return {
        status: 'requesting',
      };
    case userConstants.PROFILE_SUCCESS:
      return {
        status: 'completed',
        data: action.user,
      };
    case userConstants.PROFILE_FAILURE:
      return {
        status: 'completed',
        data: action.error
      };

    // Login
    case userConstants.LOGIN_REQUEST:
      return {
        status: 'requesting',
      };
    
    case userConstants.LOGIN_SUCCESS:
      return {
        status: 'completed',
        data: action.user,
      };

    case userConstants.LOGIN_FAILURE:
      return null;

    case userConstants.LOGOUT:
      return null;
    default:
      return state;
  }
}
