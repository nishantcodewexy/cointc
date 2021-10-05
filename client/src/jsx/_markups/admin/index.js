import React, { useContext, /* useState, */ useEffect } from "react";
import { Route, Switch, Redirect /* useLocation */ } from "react-router-dom";
import routes from "./routes";
import Nav from "./layouts/nav";
import { ThemeContext } from "../../../context/ThemeContext";
/// Style
import "../../../vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "../../../css/style.css";

import UnderConstruction from "./components/UnderConstruction";
import { useSelector } from "react-redux";
import LoginPage from "./pages/login";
import _helpers from "../../_helpers";
import _actions from "../../_actions";
import _components from "./components";
import { nanoid } from "@reduxjs/toolkit";
import useService from "../../_hooks/service.hook";

const { history } = _helpers;
const { error404 } = _components;

export default AdminMarkup;

class ComponentLoggger {
  static counter = nanoid(3);
  constructor(component) {
    this.component = component;
    this.displayName =
      component.displayName || `Unknown component #${ComponentLoggger.counter}`;
    this.log(console.log);
    return this.render();
  }

  static increment = () => ComponentLoggger.counter++;
  static decrement = () => ComponentLoggger.counter--;

  log = (cb) => {
    return cb(`Rendered Component: ${this.displayName}`, this);
  };

  render = () => this.component;
}
function AdminMarkup() {
  const session = useSelector((state) => state?.session);
  const notice = useSelector((state) => state?.notice);
  console.log("IN ADMIN MARKUP::RENDERING");
  const { data, error } = useService(() => null);

  return (
    <>
      {notice.message && (
        <div className={`alert alert-${notice.type}`}>{notice.message}</div>
      )}

      <Route exact path="/admin/login">
        {!session?.user ? (
          new ComponentLoggger(<LoginPage />)
        ) : (
          <Redirect to={{ pathname: "/admin" }} />
        )}
      </Route>
      <Route>
        {session?.user ? (
          <AdminLayout>
            {routes.map(({ url, component: Component }, i) => (
              <Route
                key={i}
                exact
                path={`/admin/${url}`}
                render={(props) =>
                  Component ? (
                    new ComponentLoggger(<Component {...props} />)
                  ) : (
                    <UnderConstruction />
                  )
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
  console.log("IN ADMIN LAYOUT::RENDERED");
  const { menuToggle } = useContext(ThemeContext);

  let path = history.location.pathname;
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
        minHeight: "100vh",
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
