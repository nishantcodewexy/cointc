import Admin from "./_markups/admin";
import Guest from "./_markups/guest";
import Error404 from "./Error404";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { CircularProgress } from "@material-ui/core";
import _helpers from "./_helpers";

const {
  store: { store, persistor },
  history,
} = _helpers;

// import { withResizeDetector } from "react-resize-detector";

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

          <Switch>
            {/* Admin user page */}
            <Route path="/admin">
              <Admin></Admin>
            </Route>

            {/* Guest user pages */}
            <Route path="/">
              <Guest></Guest>
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
