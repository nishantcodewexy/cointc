import React, { useContext, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import routes from "./routes";
import Nav from "./layouts/nav";
import { ThemeContext } from "../../../context/ThemeContext";
/// Style
import "../../../vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "../../../css/style.css";

import UnderConstruction from "./components/UnderConstruction";
import { useDispatch } from "react-redux";
import LoginPage from "./pages/login";
import _helpers from "../../_helpers";
import _actions from "../../_actions";
import _components from "./components";

const { history } = _helpers;
const { alertAction } = _actions;
const { PrivateRoute, error404 } = _components;

export default AdminMarkup;

function AdminMarkup() {
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertAction.clear());
    });
  }, []);

  return (
    <>
      {alert.message && (
        <div className={`alert ${alert.type}`}>{alert.message}</div>
      )}
      <Switch>
        <Route path="/admin/login" component={LoginPage} />

        {routes.map((data, i) => (
          <PrivateRoute
            key={i}
            exact
            path={data.url}
            component={
              <AdminLayout>{data.component ?? UnderConstruction}</AdminLayout>
            }
          />
        ))}
        {/* <Route path="*" component={error404} /> */}

        {/* <Redirect from="/admin/*" to="/admin" /> */}
      </Switch>
    </>
  );
}

function AdminLayout({ children }) {
  const { menuToggle } = useContext(ThemeContext);

  let path = history.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];

  // pages without the default layour will carry a pref: **-page** e,g login-page
  let pagePath = path.split("-").includes("page");

  <div
    id={`${!pagePath ? "main-wrapper" : ""}`}
    className={`${!pagePath ? "show" : "mh100vh"}  ${
      menuToggle ? "menu-toggle" : ""
    }`}
  >
    {!pagePath && <Nav />}

    <div className={`${!pagePath ? "content-body" : ""}`}>
      <div className={`${!pagePath ? "container-fluid" : ""}`}>{children}</div>
    </div>
  </div>;
}
