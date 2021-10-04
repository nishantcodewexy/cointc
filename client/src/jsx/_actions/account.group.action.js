import _constants from "../_constants";
import _services from "../_services";
import _helpers from "../_helpers";
import alertAction from "./alert.action";

const { group } = _services;
const { NOTICE } = _constants;

const accountGroupActions = {
  getStatistics,
  users
};
export default accountGroupActions;

function getStatistics() {
  
}

function users(){}

function log({ type = NOTICE.INFO, data = null }) {
  return { type, data };
}