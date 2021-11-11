import React, { /* useState, */ useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import useService from "../../_hooks/service.hook";
import { useSelector } from "react-redux";

import routes from "./routes";

import WOW from "wowjs";
import "./app-assets/css/bootstrap.min.css";
import "./app-assets/css/animate.css";
import "./app-assets/css/common.css";
import "./app-assets/css/style.css";
import "./app-assets/css/responsive.css";

// import '@fortawesome/fontawesome-free/css/all.min.css';
import { Header } from "./components/header/Header";
import { Header2 } from "./components/header/Header2";
import { Header3 } from "./components/header/Header3";
// import { Header4 } from "./components/header/Header4";
import { Footer } from "./components/footer/Footer";
import { Footer2 } from "./components/footer/Footer2";

// import Error404 from "../pages/error404";

function GuestMarkup({ services }) {
  const session = useSelector((state) => state?.session);

  const wow = new WOW.WOW({
    boxClass: "wow",
    animateClass: "animated",
  });

  useEffect(() => {
    wow.init();
  }, []);

  const cur_loc = window.location.pathname;
  var Custom_Header = null;
  var Custom_Footer = null;
  if (cur_loc === "/") {
    Custom_Header = <Header />;
  } else if (
    cur_loc === "/affiliate" ||
    cur_loc === "/support" ||
    cur_loc === "/my-page" ||
    cur_loc === "/my-page-2"
  ) {
    Custom_Header = <Header3 />;
  } else if (cur_loc === "/frame01") {
    Custom_Header = null;
  } else {
    Custom_Header = <Header2 />;
  }

  if (cur_loc === "/") {
    Custom_Footer = <Footer />;
  } else if (cur_loc === "/frame01") {
    Custom_Footer = null;
  } else {
    Custom_Footer = <Footer2 />;
  }

  return (
    <>
      <div class="wrap">
        {Custom_Header}
        <Switch>
          {routes.map((data, i) => (
            <Route
              key={i}
              exact
              path={`/${data.url}`}
              component={() => <data.component {...{ services, useService }} />}
              title={data.title}
            />
          ))}
        </Switch>
        {Custom_Footer}
      </div>
    </>
  );
}

export default GuestMarkup;
