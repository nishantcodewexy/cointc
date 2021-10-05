import _constants from "../_constants";
import _services from "../_services";
import _helpers from "../_helpers";

const { group } = _services;
const { NOTICE } = _constants;

const accountGroupActions = {
  getStatistics,
  users
};
export default accountGroupActions;

function getStatistics() {
  try { } catch (error) {
    console.error(error)
  }
}

function users(){}

function log({ type = NOTICE.INFO, data = null }) {
  return { type, data };
}