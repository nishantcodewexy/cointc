import { Switch, Route } from "react-router-dom";
import path from "path";
function GuestMarkup() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          Home page
        </Route>
      </Switch>
    </>
  );
}

export default GuestMarkup;
