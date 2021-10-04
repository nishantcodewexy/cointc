import _constants from "../_constants";
const { alertConstant } = _constants;

export default alert;
function alert(state = {}, action) {
  switch (action.type) {
    case alertConstant.SUCCESS:
      return {
        type: "alert-success",
        message: action.message,
      };
    case alertConstant.ERROR:
      return {
        type: "alert-danger",
        message: action.message,
      };
    case alertConstant.CLEAR:
      return {};
    default:
      return state;
  }
}
