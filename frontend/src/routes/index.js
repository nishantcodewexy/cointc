import base from "./base";
import dashboard from "./dashboard";
import admin from "./admin";

const reducer = (ac, cur) => [...ac.concat(cur)];

export const routeObject = {
  dashboard,
  base,
  admin
};

export const routeArray = Object.values(routeObject).reduce(reducer);
export default routeObject;
