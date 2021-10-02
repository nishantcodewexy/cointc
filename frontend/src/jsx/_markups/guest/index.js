import { Switch, Route } from "react-router-dom";
import routes from "./routes";
// import Error404 from "../pages/error404";
import Error404 from "../Error404";

function GuestMarkup() {
  return (<>
      {routes.map((data, i) => (
        <Route key={i} exact path={`/${data.url}`} component={data.component} />
      ))}
      <Route path="*">
        <Error404 />
      </Route>
    </>
  );
}

export default GuestMarkup;
