import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import routes from "./routes";
import Error404 from "./pages/Error404";
import Nav from "./layouts/nav";
import Footer from "./layouts/Footer";
import { ThemeContext } from "../../context/ThemeContext";

const AdminMarkup = () => {
  const { menuToggle } = useContext(ThemeContext);

  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];
  let pagePath = path.split("-").includes("page");

  return (
    <div>
      <div
        id={`${!pagePath ? "main-wrapper" : ""}`}
        className={`${!pagePath ? "show" : "mh100vh"}  ${
          menuToggle ? "menu-toggle" : ""
        }`}
      >
        {!pagePath && <Nav />}

        <div className={`${!pagePath ? "content-body" : ""}`}>
          <div
            className={`${!pagePath ? "container-fluid" : ""}`}
            style={{ minHeight: window.screen.height - 60 }}
          >
            <Switch>
              {routes.map((data, i) => (
                <Route
                  key={i}
                  exact
                  path={`/admin/${data.url}`}
                  component={data.component}
                />
              ))}
              <Route path="*" component={Error404} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminMarkup;
