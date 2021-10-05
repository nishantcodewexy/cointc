import Admin from "./_markups/admin";
import Guest from "./_markups/guest";
import { Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import _helpers from "./_helpers";
import { CircularProgress } from "@material-ui/core";

const {
  store: { store, persistor },
  history,
} = _helpers;

// import { withResizeDetector } from "react-resize-detector";

function Markup() {
  return (
    <Router history={history}>
      {console.log("MARKUP::READY")}
      <Provider store={store}>
        <PersistGate
          loading={<CircularProgress color="primary" />}
          persistor={persistor}
        >
          <Switch>
            {console.log("MARKUP SWITCH LEVEL::READY")}
            {/* Admin user page */}
            <Admin />
            {/* Guest user pages */}
            {/* <Guest /> */}
          </Switch>
        </PersistGate>
      </Provider>
    </Router>
  );
}

export default Markup;
