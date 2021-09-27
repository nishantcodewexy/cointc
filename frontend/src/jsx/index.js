import Admin from "./admin";
import Guest from "./guest";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Error404 from "./pages/error404";

export default function Markup() {
  return (
    <Router>
      <Switch>
        <Route path="/admin">
          <Admin />
        </Route>

        <Route path="/">
          <Guest />
        </Route>

        <Route path="*">
          <Error404 />
        </Route>
      </Switch>
    </Router>
  );
}
