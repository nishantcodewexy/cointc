import { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import _helpers from "./_helpers";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Services from "./_services";

import Error404 from "./_markups/_shared/component/error404.component";
import Loader from "./_markups/_shared/component/loader.component";

// import { withResizeDetector } from "react-resize-detector";

const AdminMarkup = lazy(() => import("./_markups/admin"));
const GuestMarkup = lazy(() => import("./_markups/guest"));

function Markup() {
  const session = useSelector((state) => state?.session);
  // const notice = useSelector((state) => state?.notice);
  const [services, setServices] = useState(null);

  useEffect(() => {
    setServices(
      new Services({
        token: session?.user?.token || "",
        baseURL: "/api",
      })
    );
  }, [session]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          // alignItems: "center",
          justifyContent: "center",
        }}
      >
        {services ? (
          <Switch>
            {/* Admin user page */}
            <Route path="/admin">
              <Suspense fallback={<Loader />}>
                <AdminMarkup {...{services}}></AdminMarkup>
              </Suspense>
            </Route>

            {/* Guest user pages */}
            <Route path="/">
              <Suspense fallback={<Loader />}>
                <GuestMarkup {...{services}}></GuestMarkup>
              </Suspense>
            </Route>

            {/* Error Page */}
            <Route>
              <Error404></Error404>
            </Route>
          </Switch>
        ) : (
          <>
            <Loader />
            "Initializing services..."
          </>
        )}
      </div>
    </>
  );
}

export default Markup;
