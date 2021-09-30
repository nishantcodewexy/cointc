import { Switch, Route } from "react-router-dom";
import routes from "./routes";
import Error404 from "../pages/error404";

function GuestMarkup() {
  return (
    <Switch>
      <Route path="/">
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
      </Route>
      <Route path="*">
        <div>Root: </div>
        <Error404 />
      </Route>
    </Switch>
  );
}

export default GuestMarkup;
