import Home from "./pages";
import Login from "./pages/login";
import Error404 from "../pages/error404";

const routes =[
  { url: "", component: Home },
  { url: "login-page", component: Login, },
  { url: "*", component: Error404,  },
];

export default  routes;
