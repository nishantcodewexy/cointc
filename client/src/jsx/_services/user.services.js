import _helpers from "../_helpers";
import _constants from "../_constants";
import axios from "axios";
// import qs from "qs";

const userService = {
  login,
  register,
};
let { headers } = _helpers;

export default userService;
headers = headers();

/*----------------------------Services -----------------------------*/
const url_prefix = "/account";

async function login(data) {
  const config = {
    method: "POST",
    headers,
    url: `${url_prefix}/authenticate`,
    data,
  };
  console.log({config})
  return await axios(config);
}

async function register(data) {
  const requestOptions = {
    method: "POST",
    headers: headers(),
    data,
  };
  return await axios(`${url_prefix}`, requestOptions);
}
