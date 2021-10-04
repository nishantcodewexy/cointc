import _helpers from "../_helpers";
import _constants from "../_constants";
import axios from "axios";
import qs from "qs";
const { headerHelper } = _helpers;
const { userConstant } = _constants;

const apiUrl = `http://localhost:8080/${userConstant.URL_PREFIX}`;
const headers = headerHelper();

const userService = {
  login,
  logout,
  register,
  fetchProfile,
  fetchID,
  update,
  delete: _delete,
};

export default userService;

/*----------------------------Services -----------------------------*/

async function login({email, password, role = "basic"}) {
  const url = `/account/authenticate`;
  headers.append("Content-Type", "application/x-www-form-urlencoded");

  var data = {
    email,
    password,
    role,
  };

  const requestOptions = {
    method: "POST",
    url,
    headers,
    data,
  };
  let response = null;
  return await axios(requestOptions)  
}

function logout() {
  // remove user from local storage to log user out
  
}

async function fetchProfile() {
  const requestOptions = {
    method: "GET",
    headers: headers,
    url: `${apiUrl}/admin/`,
  };

  const response = await axios(requestOptions);
  return handleResponse(response);
}

async function fetchID(id) {
  const requestOptions = {
    method: "GET",
    headers: headers,
  };

  const response = await fetch(`${apiUrl}/users/${id}`, requestOptions);
  return handleResponse(response);
}

async function register(user) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  const response = await fetch(`${apiUrl}/users/register`, requestOptions);
  return handleResponse(response);
}

async function update(user) {
  const requestOptions = {
    method: "PUT",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  const response = await fetch(`${apiUrl}/users/${user.id}`, requestOptions);
  return handleResponse(response);
}

// prefixed function name with underscore because delete is a reserved word in javascript
async function _delete(id) {
  const requestOptions = {
    method: "DELETE",
    headers: headers,
  };

  const response = await fetch(`${apiUrl}/users/${id}`, requestOptions);
  return handleResponse(response);
}

function handleResponse(response) {
  if (response.status === 401) {
    // auto logout if 401 response returned from api
    logout();
    // location.reload(true);
  }
  // response.catch(error => {

  // })
  return response.data;
}
