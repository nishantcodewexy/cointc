import _helpers from "../_helpers";
import _constants from "../_constants";
import axios from "axios";
// import qs from "qs";
const { header } = _helpers;

const headers = header();

const userService = {
  login,
  register,
};

export default userService;

/*----------------------------Services -----------------------------*/
const url_prefix = "/account";

async function login(data) {
  headers.append("Content-Type", "application/x-www-form-urlencoded");
  const requestOptions = {
    method: "POST",
    headers,
    data,
  };
  return await axios(`${url_prefix}/authenticate`, requestOptions);
}

async function register(data) {
  headers.append("Content-Type", "application/x-www-form-urlencoded");
  const requestOptions = {
    method: "POST",
    headers,
    data,
  };
  return await axios(`${url_prefix}`, requestOptions);
}
