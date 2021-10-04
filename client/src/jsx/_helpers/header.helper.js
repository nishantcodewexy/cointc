export default function header() {
  // return authorization header with jwt token
  var headers = new Headers();
  let user = JSON.parse(localStorage.getItem("user")) || null;

  if (user && user?.token)
    headers.append("Authorization", `Bearer ${user?.token}`);
  return headers;
}
