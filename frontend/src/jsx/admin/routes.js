import Home from "./pages";
import Setting from "./pages/setting";
import UserMgmt from "./pages/user_information";

export default [
  { url: "", component: Home },
  { url: "setting", component: Setting },
  { url: "user-information", component: UserMgmt },
]