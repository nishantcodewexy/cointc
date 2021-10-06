export default function headers(session) {
  // return authorization header with jwt token
  try {
    var headers = {};
    if(!session){
      let localStore = localStorage.getItem("persist:root");
      let presistedData = JSON.parse(localStore || null);
      session = JSON.parse(presistedData.session || null);

    }
    let user = session?.user || null;
    let token = user?.token || null;

    if (token) {
      headers = {
        ...headers,
        ...{ Authorization: `Bearer ${session.user?.token}` },
      };
    }
    headers = { ...headers, ...{ "Content-Type": "application/json" } };
    // console.log({ headers, session });

    return headers;
  } catch (error) {
    console.error("Request Header Error::", error);
  }
}
