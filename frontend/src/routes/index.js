import base from "./base";
import dashboard from "./dashboard";

const reducer = (ac, cur) => [...ac.concat(cur)];

export const routeObject = {
  dashboard,
  base,
};
export const routeArray = Object.values(routeObject).reduce(reducer);
export default routeObject;
