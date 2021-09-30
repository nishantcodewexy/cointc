export default {
  admin: {
    login: (obj) => "/admin/login" + toQueryString(obj),
  },
  
};

function toQueryString(obj) {
  if (!obj) {
  }

  if (typeof obj == "string") return `?${obj.split("?")[1]}`;

  return `?${new URLSearchParams(obj).toString()}`;
}
