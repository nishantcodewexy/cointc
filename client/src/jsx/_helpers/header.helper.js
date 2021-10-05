export default function header() {
  // return authorization header with jwt token
  var headers = new Headers();
  let user = JSON.parse(localStorage.getItem("persist:root")) || null;
  if (user?.session) {
    console.log(user?.session);
  }
  headers.append("Content-Type", "application/json");

  if (user && user?.session)
    headers.append("Authorization", `Bearer ${user.session?.token}`);
    
  return headers;
}
