import _helpers from "../_helpers";
import _constants from "../_constants";
import axios from "axios";

const { header } = _helpers;

const headers = header();

const groupServices = {
  getStats,
  getKYC,
};

export default groupServices;

/************************** SERVICE FUNCTIONS *************************/
const url_prefix = "/account/group";

async function getStats(data) {
  return await axios(`${url_prefix}/stats`, {
    headers,
    method: "GET",
    data,
  });
}
async function getKYC(data) {
  return await axios(`${url_prefix}/kyc`, {
    headers,
    method: "GET",
    data,
  });
}
async function updateKYC(data) {
  return await axios(`${url_prefix}/kyc`, {
    headers,
    method: "PUT",
    data,
  });
}
