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

const {
  store: { store, persistor },
  history,
} = _helpers;

// import { withResizeDetector } from "react-resize-detector";

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
              <Suspense fallback={<div>Loading...</div>}>
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
