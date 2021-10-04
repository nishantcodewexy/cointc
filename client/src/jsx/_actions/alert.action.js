import alertConstants from '../_constants/alerts.constant';

const alertActions = {
  success,
  error,
  clear
};
export default alertActions;

function success(message) {
  return { type: alertConstants.SUCCESS, message };
}

function error(message) {
  return { type: alertConstants.ERROR, message };
}

function clear() {
  return { type: alertConstants.CLEAR };
}