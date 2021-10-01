import Admin from "./_markups/admin";
import Guest from "./_markups/guest";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import _helpers from "./_helpers";
import { CircularProgress } from "@material-ui/core";

const {
  storeHelpers: { store, persistor }, historyHelpers
} = _helpers;

// import { withResizeDetector } from "react-resize-detector";

function Markup() {
  return (
    <Router history={historyHelpers}>
      <Provider store={store}>
        <PersistGate loading={<CircularProgress color="primary"  />} persistor={persistor}>
          {/* Admin user page */}
          {/* <Admin /> */}
          {/* Guest user pages */}
          <Guest />
        </PersistGate>
      </Provider>
    </Router>
  );
}

export default Markup;
