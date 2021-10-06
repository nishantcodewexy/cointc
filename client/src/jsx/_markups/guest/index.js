import { Switch, Route } from "react-router-dom";
import routes from "./routes";
// import Error404 from "../pages/error404";

function GuestMarkup() {
  return (
    <Switch>
      {routes.map((data, i) => (
        <Route
          key={i}
          exact
          path={`/${data.url}`}
          component={data.component}
        />
      ))}
    </Switch>
  );
}

export default GuestMarkup;
