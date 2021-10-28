import { Suspense, lazy } from "react";
// import Admin from "./_markups/admin";
// import Guest from "./_markups/guest";
import Error404 from "./Error404";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { CircularProgress } from "@material-ui/core";
import _helpers from "./_helpers";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
/* import "../vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "../css/style.css"; */

import front_loader from './_markups/guest/app-assets/images/loader/light-loader.gif';

const {
  store: { store, persistor },
  history,
} = _helpers;

// import { withResizeDetector } from "react-resize-detector";

// const front_loader_style = {
//   background: `url(${front_loader}) center center no-repeat scroll rgb(255, 255, 255)`,
//   position: "fixed",
//     top: "0",
//     left: "0",
//     width: "100px",
//     height: "1001px",
//     "background-size": "100% auto",
//     "background-color": "#fff",
//     "z-index": "9999999",
//     "background-repeat": "no-repeat",
//     "background-attachment": "fixed",
//     "background-position": "center middle",
// };

const style_bg=  {
  position: "fixed",
  top: "-50%",
  left: "-50%", 
  width: "200%", 
  height: "200%",
};
const style_bg_img= {
  position: "absolute", 
  top: "0", 
  left: "0", 
  right: 0, 
  bottom: 0, 
  margin: "auto", 
  "width": "100px",
  "height": "100px"
}
const AdminMarkup = lazy(() => import("./_markups/admin"));
const GuestMarkup = lazy(() => import("./_markups/guest"));

function Markup() {
  return (
    <Router>
      <Provider store={store}>
        <PersistGate
          loading={<CircularProgress color="primary" />}
          persistor={persistor}
        >
          {/* <ul
            className="d-flex p-3"
            style={{ gap: 10, background: "#f3f3f3", fontWeight: "bold" }}
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/admin">Admin dashboard</Link>
            </li>
            <li>
              <Link to="/admin/login">Admin login</Link>
            </li>
          </ul> */}
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
          <Switch>
            {/* Admin user page */}
            <Route path="/admin">
              <Suspense fallback={<div>Loading...</div>}>
                <AdminMarkup></AdminMarkup>
              </Suspense>
            </Route>

            {/* Guest user pages */}
            <Route path="/">
              <Suspense fallback={
                  <div>
                    <div id="bg" style={style_bg}>
                      <img src={front_loader} alt="" style={style_bg_img}/>
                  </div>
                </div>
              }>
                <GuestMarkup></GuestMarkup>
              </Suspense>
            </Route>

            {/* Error Page */}
            <Route>
              <Error404></Error404>
            </Route>
          </Switch>
        </PersistGate>
      </Provider>
    </Router>
  );
}

export default Markup;
