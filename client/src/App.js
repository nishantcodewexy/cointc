/// Components
import Markup from "./jsx";
import ThemeContextProvider from "./context/ThemeContext";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { CircularProgress } from "@material-ui/core";
import { BrowserRouter as Router } from "react-router-dom";
import _helpers from "./jsx/_helpers";

const {
  store: { store, persistor },
  // history,
} = _helpers;

const App = () => {
  return (
    <>
      <ThemeContextProvider>
        <Router>
          <Provider store={store}>
            <PersistGate
              loading={<CircularProgress color="primary" />}
              persistor={persistor}
            >
              <Markup />
            </PersistGate>
          </Provider>
        </Router>
      </ThemeContextProvider>
    </>
  );
};

export default App;
