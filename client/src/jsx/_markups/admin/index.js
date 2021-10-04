import React, { useContext, /* useState, */ useEffect } from "react";
import { Route, Switch, Redirect, /* useLocation */ } from "react-router-dom";
import routes from "./routes";
import Nav from "./layouts/nav";
import { ThemeContext } from "../../../context/ThemeContext";
/// Style
import "../../../vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "../../../css/style.css";

import UnderConstruction from "./components/UnderConstruction";
import { useDispatch, useSelector } from "react-redux";
import LoginPage from "./pages/login";
import _helpers from "../../_helpers";
import _actions from "../../_actions";
import _components from "./components";

const { historyHelper } = _helpers;
const { alertAction } = _actions;
const { error404 } = _components;

export default AdminMarkup;

function AdminMarkup() {
  const session = useSelector((state) => state?.session);
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  useEffect(() => {
    historyHelper.listen((location, action) => {
      // clear alert on location change
      dispatch(alertAction.clear());
    });
  }, []);

  return (
    <>
      {alert.message && (
        <div className={`alert ${alert.type}`}>{alert.message}</div>
      )}
      <Route exact path="/admin/login">
        {!(session?.user) ? <LoginPage /> : <Redirect to={{ pathname: "/admin" }} />}
      </Route>
      <Route>
        {(session?.user) ? (
          <AdminLayout>
            {routes.map(({ url, component: Component }, i) => (
              <Route
                key={i}
                exact
                path={`/admin/${url}`}
                render={(props) =>
                  Component ? <Component {...props} /> : <UnderConstruction />
                }
              />
            ))}
          </AdminLayout>
        ) : (
          <Redirect to={{ pathname: "/admin/login" }} />
        )}
      </Route>

      <Route path="*" component={error404} />

      {/* <Redirect from="/admin/*" to="/admin" /> */}
    </>
  );
}

function AdminLayout({ children }) {
  const { menuToggle } = useContext(ThemeContext);

  let path = historyHelper.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];

  // pages without the default layour will carry a pref: **-page** e,g login-page
  let pagePath = path.split("-").includes("page");

  return (
    <div
      id={`${!pagePath ? "main-wrapper" : ""}`}
      className={`${!pagePath ? "show" : "mh100vh"}  ${
        menuToggle ? "menu-toggle" : ""
        }`}
      style={{
        minHeight: '100vh'
      }}
    >
      {!pagePath && <Nav />}

      <div className={`${!pagePath ? "content-body" : ""}`}>
        <div className={`${!pagePath ? "container-fluid" : ""}`}>
          <Switch>{children}</Switch>
        </div>
      </div>
    </div>
  );
}

function AuthMiddleware({ component }) {
  return <></>;
}
