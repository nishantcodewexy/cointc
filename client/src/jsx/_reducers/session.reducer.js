import _constants from "../_constants";

const { userConstant } = _constants;
let user = JSON.parse(localStorage.getItem("user")) || null;

const initialState = {
  request: null,
  error: null,
  user,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    // case userConstants.PROFILE_REQUEST:
    //   return {
    //     status: 'requesting',
    //   };
    // case userConstants.PROFILE_SUCCESS:
    //   return {
    //     status: 'completed',
    //     data: action.user,
    //   };
    // case userConstants.PROFILE_FAILURE:
    //   return {
    //     status: 'completed',
    //     data: action.error
    //   };

    // // Login
    case userConstant.LOGIN_REQUEST:
      return {
        request: { ...action.data },
      };

    case userConstant.LOGIN_SUCCESS:
      return {
        user: { ...action.data },
      };

    case userConstant.LOGIN_FAILURE:
      return {
        error: { ...action.data },
      };

    case userConstant.LOGOUT:
      return {       
        user: null,
      };
    default:
      return state;
  }
}
