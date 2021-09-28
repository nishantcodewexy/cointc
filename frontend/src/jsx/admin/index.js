import React, { useContext } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import routes from "./routes";
import Nav from "./layouts/nav";
import { ThemeContext } from "../../context/ThemeContext";
/// Style
import "../../vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "../../css/style.css";
import UnderConstruction from "./components/UnderConstruction";
import { Provider } from "react-redux";
import store from "./store";

const AdminMarkup = () => {
  const { menuToggle } = useContext(ThemeContext);
  const history = useHistory();

  let path = history.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];

  // pages without the default layour will carry a pref: **-page** e,g login-page
  let pagePath = path.split("-").includes("page");

  return (
    <Provider store={store}>
      <div
        id={`${!pagePath ? "main-wrapper" : ""}`}
        className={`${!pagePath ? "show" : "mh100vh"}  ${
          menuToggle ? "menu-toggle" : ""
        }`}
      >
        {!pagePath && <Nav />}

        <div className={`${!pagePath ? "content-body" : ""}`}>
          <div className={`${!pagePath ? "container-fluid" : ""}`}>
            <Switch>
              {routes.map((data, i) => (
                <Route
                  key={i}
                  exact
                  path={`/admin/${data.url}`}
                  component={data.component ?? UnderConstruction}
                />
              ))}
            </Switch>
          </div>
        </div>
      </div>
    </Provider>
  );
};
export default AdminMarkup;
