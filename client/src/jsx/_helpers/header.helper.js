export default function header() {
  // return authorization header with jwt token
  var headers = new Headers();
  let root = JSON.parse(localStorage.getItem("persist:root")) || null;
  let session = root?.session;

  headers.append("Content-Type", "application/json");

  if (session) {
    session = JSON.parse(session);
    headers.append("Authorization", `Bearer ${session?.user?.token}`);
    //   for (var pair of headers.entries()) {
    //     console.log(pair[0]+ ': '+ pair[1]);
    //  }
  }
  return headers;
}
