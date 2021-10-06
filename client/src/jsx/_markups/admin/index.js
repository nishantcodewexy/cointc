import React, { useContext, /* useState, */ useEffect } from "react";
import {
  Route,
  Switch,
  Redirect,
  useParams,
  useRouteMatch /* useLocation */,
} from "react-router-dom";
import routes from "./routes";
import Nav from "./layouts/nav";
import { ThemeContext } from "../../../context/ThemeContext";
import { normalize } from "path";
/// Style
import "../../../vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "../../../css/style.css";

import UnderConstruction from "./components/UnderConstruction";
import { useSelector } from "react-redux";
import LoginPage from "./pages/login";
import _helpers from "../../_helpers";
import _actions from "../../_actions";
import _components from "./components";

const { history } = _helpers;
const { Error404 } = _components;

export default AdminMarkup;

function AdminMarkup() {
  const session = useSelector((state) => state?.session);
  const notice = useSelector((state) => state?.notice);
  let match = useRouteMatch();
  let params = useParams();
  return (
    <Switch>
      <Route exact path="/admin/login">
        {!session?.user ? (
          <LoginPage />
        ) : (
          <Redirect to={{ pathname: `${match.path}` }} />
        )}
      </Route>
      <Route path="/admin">
        <AdminLayout>
          <Switch>
            {session?.user ? (
              routes.map(({ url, component: Component }, i) => (
                <Route
                  key={i}
                  exact
                  path={normalize(`/admin/${url}`)}
                  render={(props) =>
                    Component ? <Component {...props} /> : <UnderConstruction />
                  }
                />
              ))
            ) : (
              <Redirect to={{ pathname: `/admin/login` }} />
            )}
            <Route exact path="/admin/">
              <Redirect to={{ pathname: "/admin" }} />
            </Route>
            <Route>
              <Error404 />
            </Route>
          </Switch>
        </AdminLayout>
      </Route>
    </Switch>
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
          {children}
        </div>
      </div>
    </div>
  );
}
