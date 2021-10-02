import _helpers from "../_helpers";
import _constants from "../_constants";
import axios from "axios";

const { authHeader } = _helpers;
const { userConstants } = _constants;

const userService = {
  login,
  logout,
  register,
  fetchProfile,
  fetchID,
  update,
  delete: _delete,
};
const apiUrl = `/${userConstants.URL_PREFIX}`;
export default userService;

async function login(email, password) {
  const requestOptions = {
    method: "POST",
    url: `${apiUrl}/admin/authenticate`,
    headers: { "Content-Type": "application/json" },
    data: { email, password },
  };

  const response = await axios(requestOptions);
  const data = handleResponse(response);

  // store user details and jwt token in local storage to keep user logged in between page refreshes
  localStorage.setItem("user", JSON.stringify(data));
  return data;
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}

async function fetchProfile() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
    url: `${apiUrl}/admin/`,
  };

  const response = await axios(requestOptions);
  return handleResponse(response);
}

async function fetchID(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
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
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  const response = await fetch(`${apiUrl}/users/${user.id}`, requestOptions);
  return handleResponse(response);
}

// prefixed function name with underscore because delete is a reserved word in javascript
async function _delete(id) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
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
  return response.data;
  
}
